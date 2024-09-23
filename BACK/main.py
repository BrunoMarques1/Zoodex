from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from starlette.middleware.cors import CORSMiddleware
from typing import List
import boto3

app = FastAPI()

# Configurando o middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens; ajuste conforme necessário
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos; ajuste conforme necessário
    allow_headers=["*"],  # Permite todos os cabeçalhos; ajuste conforme necessário
)

def detect_labels(image_bytes: bytes) -> List[dict]:
    client = boto3.client('rekognition')
    
    response = client.detect_labels(
        Image={'Bytes': image_bytes},
        MaxLabels=20,  # Ajuste o número conforme necessário
        MinConfidence=40  # Ajuste o nível de confiança conforme necessário
    )
    return response.get('Labels', [])

@app.get("/")
async def root():
#    return FileResponse('./src/index.html')
    return {"msg":"Olá Mundo"}

@app.post("/detect/")
async def detect_image_labels(file: UploadFile):
    image_bytes = await file.read()
    labels = detect_labels(image_bytes)
    
    if labels:
        return {"labels": [{"name": label['Name'], "confidence": round(label['Confidence'], 2)} for label in labels]}
    else:
        return {"message": "No elements detected in the image."}