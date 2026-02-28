from fastapi import FastAPI
from routes.upload import router as upload_router
from routes.questions import router as question_router
from routes.quiz import router as quiz_router
from routes.export import router as export_router

from database import engine
from models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(upload_router)
app.include_router(question_router)
app.include_router(quiz_router)
app.include_router(export_router)

@app.get("/")
def home():
    return {"message": "AI Lecture Question Generator API running"}