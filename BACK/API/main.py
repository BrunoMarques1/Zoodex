from fastapi import FastAPI, UploadFile
from starlette.middleware.cors import CORSMiddleware
from rekognition import detect_labels
from models import Body, Animais
from database import session

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

animais = ["Tiger"]

@app.get("/")
async def root():
    return {"msg":"Olá Mundo"}

@app.get("/animais")
async def root():
    data = session.query(Animais).all()
    return data

@app.post("/detect/")
async def detect_image_labels(file: UploadFile):
    image_bytes = await file.read()
    labels = detect_labels(image_bytes)

    for i in labels:
        print(i["Name"], " - ", i["Confidence"])
    for i in labels:
        if (i['Name'] in animais and i['Confidence'] > 89):
        #if True:
        #    print( {"nome": i["Name"], "confidence":i['Confidence']})
            return {"nome": i["Name"], "confidence":i['Confidence']}

#    if labels:
#        print ({"labels": [{"name": label['Name'], "confidence": round(label['Confidence'], 2)} for label in labels]})
#    else:
#        return {"message": "No elements detected in the image."}