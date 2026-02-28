from fastapi import APIRouter, UploadFile, File
import os
from services.pdf_processor import extract_text_from_pdf
from services.question_generator import generate_questions

from database import SessionLocal
from models import Question

router = APIRouter()

UPLOAD_FOLDER = "documents"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/upload-lecture")
async def upload_lecture(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    lecture_text = extract_text_from_pdf(file_path)

    questions = generate_questions(lecture_text)

    db = SessionLocal()

    for q in questions:

        question_record = Question(
            question_text=q["question"],
            question_type=q["type"],
            difficulty=q.get("difficulty", "Medium")
        )

        db.add(question_record)

    db.commit()

    return {
        "message": "File processed and questions stored",
        "questions_generated": len(questions)
    }