import os
import io
from PIL import Image
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def create_sample_image(filename, size=(300, 300), color=(120, 180, 200), format="JPEG"):
    img = Image.new("RGB", size, color=color)
    buf = io.BytesIO()
    img.save(buf, format=format)
    return buf.getvalue()

def run_tests():
    print("--- 1. Testing GET /health ---")
    res = client.get("/health")
    assert res.status_code == 200, f"Expected 200, got {res.status_code}"
    print("GET /health status:", res.status_code, "response:", res.json())

    print("\n--- 2. Testing POST /predict with normal photo ---")
    img_data = create_sample_image("normal.jpg", (400, 400), (200, 100, 50))
    res = client.post("/predict", files={"file": ("normal.jpg", img_data, "image/jpeg")})
    print("Normal photo status:", res.status_code, "response:", res.json())
    assert res.status_code == 200
    assert "label" in res.json() and "confidence" in res.json()

    print("\n--- 3. Testing POST /predict with edited/PNG image ---")
    img_data = create_sample_image("edited.png", (300, 300), (50, 150, 250), format="PNG")
    res = client.post("/predict", files={"file": ("edited.png", img_data, "image/png")})
    print("PNG photo status:", res.status_code, "response:", res.json())
    assert res.status_code == 200

    print("\n--- 4. Testing POST /predict with tiny image (1x1) ---")
    tiny_data = create_sample_image("tiny.jpg", (1, 1), (255, 255, 255))
    res = client.post("/predict", files={"file": ("tiny.jpg", tiny_data, "image/jpeg")})
    print("Tiny image (1x1) status:", res.status_code, "response:", res.json())

    print("\n--- 5. Testing POST /predict with corrupted file ---")
    corrupt_data = b"NOT_A_VALID_IMAGE_DATA_BYTES_12345"
    res = client.post("/predict", files={"file": ("corrupt.jpg", corrupt_data, "image/jpeg")})
    print("Corrupt image status:", res.status_code, "response:", res.json())
    assert res.status_code == 400
    assert "error" in res.json()

    print("\n--- 6. Testing POST /predict with PDF renamed to .jpg ---")
    pdf_data = b"%PDF-1.4\n%...\nFake PDF header and content\n%%EOF"
    res = client.post("/predict", files={"file": ("fake_document.jpg", pdf_data, "image/jpeg")})
    print("PDF renamed to .jpg status:", res.status_code, "response:", res.json())
    assert res.status_code == 400
    assert "error" in res.json()

    print("\n--- 7. Testing POST /predict with large image (>10 MB) ---")
    oversized_data = b"0" * (11 * 1024 * 1024)
    res = client.post("/predict", files={"file": ("huge.jpg", oversized_data, "image/jpeg")})
    print("Oversized image status:", res.status_code, "response:", res.json())
    assert res.status_code == 400
    assert "error" in res.json()

    print("\n--- 8. Testing POST /predict with disallowed file type (e.g. text/plain) ---")
    txt_data = b"Hello world"
    res = client.post("/predict", files={"file": ("test.txt", txt_data, "text/plain")})
    print("Disallowed mime status:", res.status_code, "response:", res.json())
    assert res.status_code == 400
    assert "error" in res.json()

    print("\n=== ALL TEST CASES PASSED SUCCESSFULLY WITH CLEAN RESPONSES! ===")

if __name__ == "__main__":
    run_tests()
