import io, os, numpy as np, torch, timm
from PIL import Image, ImageChops
import torchvision.transforms as T

DEV = "cuda" if torch.cuda.is_available() else "cpu"
MODEL = timm.create_model("efficientnet_b0", pretrained=False, num_classes=2)

MODEL_DIR = os.path.dirname(os.path.abspath(__file__))
WEIGHTS_PATH = os.path.join(MODEL_DIR, "forgery_effb0_ela.pth")
if not os.path.exists(WEIGHTS_PATH) and os.path.exists("forgery_effb0_ela.pth"):
    WEIGHTS_PATH = "forgery_effb0_ela.pth"

MODEL.load_state_dict(torch.load(WEIGHTS_PATH, map_location=DEV))
MODEL.to(DEV).eval()

TF = T.Compose([
    T.Resize((224, 224)),
    T.ToTensor(),
    T.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

def ela_image(img, q=90, scale=15):
    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=q)
    buf.seek(0)
    diff = ImageChops.difference(img, Image.open(buf))
    arr = np.asarray(diff).astype(np.float32) * scale
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))

def predict(image_path):
    img = Image.open(image_path).convert("RGB")
    x = TF(ela_image(img)).unsqueeze(0).to(DEV)
    with torch.no_grad():
        prob = torch.softmax(MODEL(x), 1)[0].cpu().tolist()
    label = "forged" if prob[1] > prob[0] else "authentic"
    return {"label": label, "confidence": round(max(prob), 4)}
