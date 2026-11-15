import sys, os
from PIL import Image

sys.path.insert(0, r"C:\Users\Anshika\.gemini\antigravity\scratch\VERIFAI\backend\model")
from predict import predict

# Create a test image
test_img_path = r"C:\Users\Anshika\.gemini\antigravity\scratch\VERIFAI\backend\test_image.jpg"
img = Image.new("RGB", (300, 300), color=(150, 100, 50))
img.save(test_img_path, "JPEG")

print("Calling predict on test image...")
res = predict(test_img_path)
print("Result:", res)
