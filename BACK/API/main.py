from fastapi import FastAPI, UploadFile, Depends
from starlette.middleware.cors import CORSMiddleware
from rekognition import detect_labels
from models import Body, Animais
from database import get_db
from sqlalchemy import select
from sqlalchemy.orm import Session


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

lista = ["Lion","Giraffe","Elephant","Rhino","Hippo","Tiger"]

@app.get("/api/teste/")
async def root():
    return {"msg":"teste++"}

@app.get("/api/animais/")
async def root(db: Session = Depends(get_db)):
    data = db.query(Animais).all()
    return data

@app.post("/detect/")
async def detect_image_labels(file: UploadFile, db: Session = Depends(get_db)):
    image_bytes = await file.read()
    labels = detect_labels(image_bytes)

    for i in labels:
        if (i['Name'] in lista and i['Confidence'] > 89):
            result = db.query(Animais).filter(Animais.nome_eng == i['Name']).first()
            print(result)
            if result:
                return {
                    "nome": result.nome,
                    "descricao": result.descricao,
                    "confidence": i['Confidence']
                }



