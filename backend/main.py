import sys
import os
import tempfile
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Add model directory to sys.path so 'from predict import predict' works seamlessly
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(CURRENT_DIR, "model")
if MODEL_DIR not in sys.path:
    sys.path.insert(0, MODEL_DIR)
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

from predict import predict   # model loads once on import

app = FastAPI(title="VERIFAI Image Forgery Detection API")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "detail": exc.detail}
    )

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
async def run_predict(file: UploadFile = File(...)):
    if file.content_type not in ("image/jpeg", "image/png"):
        raise HTTPException(400, "Only JPG and PNG images are allowed")
    data = await file.read()
    if len(data) == 0:
        raise HTTPException(400, "Uploaded file is empty")
    if len(data) > 10 * 1024 * 1024:
        raise HTTPException(400, "File too large (max 10 MB)")
    suffix = ".png" if file.content_type == "image/png" else ".jpg"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(data)
        path = tmp.name
    try:
        return predict(path)
    except Exception:
        raise HTTPException(400, "Could not process this image")
    finally:
        if os.path.exists(path):
            os.remove(path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
