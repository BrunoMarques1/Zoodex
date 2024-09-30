from fastapi import FastAPI, UploadFile
from starlette.middleware.cors import CORSMiddleware
from rekognition import detect_labels
from models import Body, Animais
from database import session
from sqlalchemy import select


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

lista = ["Lion"]

@app.get("/")
async def root():
    return {"msg":"TESTE"}

@app.get("/animais")
async def root():
    data = session.query(Animais).all()
    return data

@app.post("/detect/")
async def detect_image_labels(file: UploadFile):
    image_bytes = await file.read()
    labels = detect_labels(image_bytes)

    for i in labels:
        if (i['Name'] in lista and i['Confidence'] > 89):
            result = session.query(Animais).filter(Animais.nome_eng == i['Name']).first()
            print(result)
            if result:
                return {
                    "nome": result.nome,
                    "descricao": result.descricao,
                    "confidence": i['Confidence']
                }



