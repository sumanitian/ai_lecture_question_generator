from fastapi import FastAPI
from routes.upload import router as upload_router
from database import engine
from models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(upload_router)

@app.get("/")
def home():
    return {"message": "AI Lecture Question Generator API running"}