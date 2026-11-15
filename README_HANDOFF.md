# VERIFAI — Image Forgery Detection System
## Group Handoff & Project Documentation

---

### 1. How to Share This Project With The Group

#### Option A: GitHub (Recommended)
Because `forgery_effb0_ela.pth` is **16.3 MB**, it is well within GitHub's standard 100 MB file limit.
```bash
cd C:\Users\Anshika\Desktop\VERIFAI
git add .
git commit -m "feat: complete backend API with ELA EfficientNet-B0 and frontend integration"
git push origin main
```

#### Option B: Zip File (Quick Sharing via Drive / Teams)
Zip the `VERIFAI` folder **excluding `node_modules`** to keep the zip file under ~25 MB:
- Include: `backend/`, `src/`, `public/`, `package.json`, `index.html`, etc.
- Exclude: `node_modules/` (they can run `npm install` in 15 seconds).

---

### 2. Architecture Overview

```
[ User Browser ]
       │
       ▼ (Upload JPG / PNG)
[ React + Vite Frontend (Port 5173) ]
       │
       ▼ POST http://127.0.0.1:8000/predict (multipart/form-data)
[ FastAPI Backend (Port 8000) ]
       │
       ▼ Preprocessing: ELA (Error Level Analysis)
         - Resave as JPEG at Quality 90
         - Calculate pixel difference against original
         - Multiply difference by Scale factor 15
         - Clip to [0, 255] and convert to RGB
       │
       ▼ Tensor Transformation
         - Resize to (224, 224)
         - Normalize (ImageNet mean & std)
       │
       ▼ Deep Learning Inference
         - Model: EfficientNet-B0 (loaded once on startup)
         - Weights: forgery_effb0_ela.pth (2 classes)
         - Softmax probability calculation
       │
       ▼ Output
  {"label": "forged" | "authentic", "confidence": 0.93}
```

---

### 3. Dependencies & Installation

#### Backend Dependencies (Python 3.10+)
```bash
cd backend
pip install fastapi uvicorn python-multipart torch torchvision timm pillow numpy
```
*(Or install via `pip install -r requirements.txt`)*

#### Frontend Dependencies (Node.js 18+)
```bash
npm install
```

---

### 4. Running the Project (Step-by-Step)

#### Terminal 1 — Start Backend Server:
```bash
cd backend
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```
- API Health Check: `http://127.0.0.1:8000/health`
- Interactive Swagger API Docs: `http://127.0.0.1:8000/docs`

#### Terminal 2 — Start Frontend Application:
```bash
npm run dev
```
- Open `http://localhost:5173` in your browser.

---

### 5. What Was Done

1. **Model Weights Setup:** Successfully integrated `forgery_effb0_ela.pth` (16.3 MB) into `backend/model/`.
2. **Deterministic Preprocessing:** Built `predict.py` strictly enforcing ELA parameters (`quality=90`, `scale=15`, resolution `224×224`).
3. **Optimized Model Lifecycle:** Model loads **once at startup**, avoiding per-request reloading and achieving $\approx 1\text{–}2\text{ s}$ inference time on CPU.
4. **FastAPI Engine:** Built `main.py` with CORS, `/health`, `/predict`, file size guardrails (max 10 MB), and clean HTTP 400 error handling for corrupt files or non-image formats.
5. **Rigorous Test Suite:** Built `test_live_server.py` verifying 8 test cases: normal photos, edited images, 1×1 micro images, corrupt files, disguised PDFs, oversized images, and disallowed MIME types.
6. **Frontend Integration:**
   - Updated `AnalyzePage.jsx` to dispatch real multipart uploads to the backend.
   - Updated `ResultsPage.jsx` to remove demo labels on real inference, show dynamic confidence scores, present cautious phrasing ("Likely forged"), and cite the CASIA v2 benchmark.

---

### 6. Review-2 Key Metrics to Quote
- **Accuracy:** **91.6%** on CASIA v2 test split
- **F1-Score:** **89.9%** on CASIA v2 test split
- **Forensic Disclaimer:** Confidence scores represent model probability, not definitive legal proof.

---

### 7. What Is Left (Next Steps / Future Work)
- [ ] **Dockerization:** Create a `Dockerfile` / `docker-compose.yml` for unified one-click deployment.
- [ ] **Spatial Localization Heatmap:** Display a bounding box or highlighted mask over the specific region identified as forged.
- [ ] **Batch Processing:** Support analyzing multiple images or PDF multi-page attachments simultaneously.
- [ ] **Cloud Hosting:** Deploy backend (e.g., Render/Railway) and frontend (Vercel/Netlify) if a public URL is needed for evaluation.
