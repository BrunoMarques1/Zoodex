from fastapi import FastAPI, UploadFile, Depends
from starlette.middleware.cors import CORSMiddleware
from rekognition import detect_labels
from models import Body, Animais
from database import get_db
from sqlalchemy import select
from sqlalchemy.orm import Session
import requests
import httpx
import asyncio


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3030"],  # Origem específica
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

lista = ["Lion","Giraffe","Elephant","Rhino","Hippo","Tiger"]

@app.get("/py_api/teste/")
async def root():
    return {"msg":"teste+++"}

@app.get("/py_api/animais/")
async def root(db: Session = Depends(get_db)):
    data = db.query(Animais).all()
    return data




#@app.post("/py_api/detect/")
#async def detect_image_labels(file: UploadFile, db: Session = Depends(get_db)):
#    image_bytes = await file.read()
#    labels = detect_labels(image_bytes)
#
#    for i in labels:
#        if i['Name'] in lista and i['Confidence'] > 89:
#            result = db.query(Animais).filter(Animais.nome_eng == i['Name']).first()
#            print(result)
#            if result:
#                # Cria uma task assíncrona para enviar o POST sem bloquear o retorno
#                asyncio.create_task(send_analysis(result.id))
#                
#                # Retorna imediatamente após criar a task
#                return {
#                    "nome": result.nome,
#                    "descricao": result.descricao,
#                    "confidence": i['Confidence']
#                }
#
## Função separada para envio do POST
#async def send_analysis(animal_id):
#    async with httpx.AsyncClient() as client:
#        await client.post("http://localhost:3030/node_api/teste", json={"animal_id": animal_id})




@app.post("/py_api/detect/")
async def detect_image_labels(file: UploadFile, db: Session = Depends(get_db)):
    image_bytes = await file.read()
    labels = detect_labels(image_bytes)

    for i in labels:
        if (i['Name'] in lista and i['Confidence'] > 89):
            result = db.query(Animais).filter(Animais.nome_eng == i['Name']).first()
            print(result)
            if result:
                #requests.post("http://localhost:3030/node_api/teste", json={"animal_id": result.id})
                #async with httpx.AsyncClient() as client:
                #    await client.post("http://localhost:3030/node_api/teste", json={"animal_id": result.id})
                return {
                    "nome": result.nome,
                    "descricao": result.descricao,
                    "confidence": i['Confidence']
                }



