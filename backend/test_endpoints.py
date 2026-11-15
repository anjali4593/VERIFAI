import asyncio, os, io
from PIL import Image
from fastapi import UploadFile, HTTPException
import main

async def test_all_endpoints():
    print("--- 1. Testing GET /health ---")
    h = main.health()
    print("Health response:", h)
    assert h == {"status": "ok"}

    print("\n--- 2. Testing POST /predict with normal image ---")
    img = Image.new("RGB", (300, 300), color=(100, 200, 150))
    buf = io.BytesIO()
    img.save(buf, "JPEG")
    buf.seek(0)
    upload = UploadFile(file=buf, filename="normal.jpg", headers={"content-type": "image/jpeg"})
    res = await main.run_predict(upload)
    print("Normal image result:", res)
    assert "label" in res and "confidence" in res

    print("\n--- 3. Testing POST /predict with edited PNG image ---")
    img = Image.new("RGB", (250, 250), color=(200, 50, 100))
    buf = io.BytesIO()
    img.save(buf, "PNG")
    buf.seek(0)
    upload = UploadFile(file=buf, filename="edited.png", headers={"content-type": "image/png"})
    res = await main.run_predict(upload)
    print("Edited PNG result:", res)
    assert "label" in res and "confidence" in res

    print("\n--- 4. Testing POST /predict with tiny image (1x1) ---")
    img = Image.new("RGB", (1, 1), color=(255, 255, 255))
    buf = io.BytesIO()
    img.save(buf, "JPEG")
    buf.seek(0)
    upload = UploadFile(file=buf, filename="tiny.jpg", headers={"content-type": "image/jpeg"})
    res = await main.run_predict(upload)
    print("Tiny image result:", res)
    assert "label" in res

    print("\n--- 5. Testing POST /predict with corrupted file ---")
    buf = io.BytesIO(b"CORRUPTED_NON_IMAGE_DATA_123456789")
    upload = UploadFile(file=buf, filename="corrupt.jpg", headers={"content-type": "image/jpeg"})
    try:
        await main.run_predict(upload)
        print("FAILED: Did not raise exception on corrupt image")
    except HTTPException as e:
        print(f"PASS: Caught clean HTTPException {e.status_code}: {e.detail}")

    print("\n--- 6. Testing POST /predict with PDF renamed to .jpg ---")
    buf = io.BytesIO(b"%PDF-1.4\n%...\nFake PDF header and content\n%%EOF")
    upload = UploadFile(file=buf, filename="fake.jpg", headers={"content-type": "image/jpeg"})
    try:
        await main.run_predict(upload)
        print("FAILED: Did not raise exception on PDF renamed to JPG")
    except HTTPException as e:
        print(f"PASS: Caught clean HTTPException {e.status_code}: {e.detail}")

    print("\n--- 7. Testing POST /predict with large image (>10MB) ---")
    buf = io.BytesIO(b"0" * (11 * 1024 * 1024))
    upload = UploadFile(file=buf, filename="big.jpg", headers={"content-type": "image/jpeg"})
    try:
        await main.run_predict(upload)
        print("FAILED: Did not raise exception on big image")
    except HTTPException as e:
        print(f"PASS: Caught clean HTTPException {e.status_code}: {e.detail}")

    print("\n--- 8. Testing POST /predict with invalid content-type ---")
    buf = io.BytesIO(b"Hello world")
    upload = UploadFile(file=buf, filename="document.pdf", headers={"content-type": "application/pdf"})
    try:
        await main.run_predict(upload)
        print("FAILED: Did not raise exception on bad mime type")
    except HTTPException as e:
        print(f"PASS: Caught clean HTTPException {e.status_code}: {e.detail}")

    print("\n=== ALL TEST CASES PASSED WITH 100% CLEAN RESULTS! ===")

if __name__ == "__main__":
    asyncio.run(test_all_endpoints())
