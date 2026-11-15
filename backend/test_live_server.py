import os
import sys
import time
import io
import threading
import urllib.request
import urllib.error
import json
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import uvicorn
from main import app

# Start uvicorn in a separate thread
server_thread = None

def start_server():
    config = uvicorn.Config(app=app, host="127.0.0.1", port=8000, log_level="warning")
    server = uvicorn.Server(config)
    server.run()

thread = threading.Thread(target=start_server, daemon=True)
thread.start()

# Wait for server to come up
time.sleep(3)

def send_multipart(url, filename, content_bytes, content_type):
    boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
    body = bytearray()
    body.extend(f"--{boundary}\r\n".encode("utf-8"))
    body.extend(f'Content-Disposition: form-data; name="file"; filename="{filename}"\r\n'.encode("utf-8"))
    body.extend(f"Content-Type: {content_type}\r\n\r\n".encode("utf-8"))
    body.extend(content_bytes)
    body.extend(f"\r\n--{boundary}--\r\n".encode("utf-8"))

    req = urllib.request.Request(url, data=bytes(body))
    req.add_header("Content-Type", f"multipart/form-data; boundary={boundary}")
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        try:
            return e.code, json.loads(err_body)
        except Exception:
            return e.code, err_body

print("=== STARTING LIVE API TESTS ===")

# Test 1: Health
print("\n--- Test 1: GET /health ---")
with urllib.request.urlopen("http://127.0.0.1:8000/health") as resp:
    print("Health response:", resp.status, resp.read().decode("utf-8"))

# Test 2: Normal Image
print("\n--- Test 2: Normal Image (JPG) ---")
img = Image.new("RGB", (300, 300), color=(180, 120, 60))
buf = io.BytesIO()
img.save(buf, "JPEG")
code, res = send_multipart("http://127.0.0.1:8000/predict", "normal.jpg", buf.getvalue(), "image/jpeg")
print(f"Normal image response ({code}):", res)

# Test 3: Edited Image (PNG)
print("\n--- Test 3: Edited Image (PNG) ---")
img = Image.new("RGB", (250, 250), color=(50, 150, 220))
buf = io.BytesIO()
img.save(buf, "PNG")
code, res = send_multipart("http://127.0.0.1:8000/predict", "edited.png", buf.getvalue(), "image/png")
print(f"Edited image response ({code}):", res)

# Test 4: Tiny image (1x1)
print("\n--- Test 4: Tiny Image (1x1) ---")
img = Image.new("RGB", (1, 1), color=(255, 255, 255))
buf = io.BytesIO()
img.save(buf, "JPEG")
code, res = send_multipart("http://127.0.0.1:8000/predict", "tiny.jpg", buf.getvalue(), "image/jpeg")
print(f"Tiny image response ({code}):", res)

# Test 5: Corrupt image
print("\n--- Test 5: Corrupt Image ---")
code, res = send_multipart("http://127.0.0.1:8000/predict", "corrupt.jpg", b"INVALID_GARBAGE_DATA", "image/jpeg")
print(f"Corrupt image response ({code}):", res)

# Test 6: PDF renamed to .jpg
print("\n--- Test 6: PDF renamed to .jpg ---")
code, res = send_multipart("http://127.0.0.1:8000/predict", "fake.jpg", b"%PDF-1.4\nFake PDF content\n%%EOF", "image/jpeg")
print(f"PDF renamed response ({code}):", res)

# Test 7: Big image (> 10MB)
print("\n--- Test 7: Big Image (>10MB) ---")
code, res = send_multipart("http://127.0.0.1:8000/predict", "big.jpg", b"X" * (11 * 1024 * 1024), "image/jpeg")
print(f"Big image response ({code}):", res)

# Test 8: Disallowed MIME type
print("\n--- Test 8: Disallowed file type ---")
code, res = send_multipart("http://127.0.0.1:8000/predict", "test.txt", b"plain text", "text/plain")
print(f"Disallowed type response ({code}):", res)

print("\n=== ALL LIVE SERVER TESTS COMPLETED SUCCESSFULLY! ===")
