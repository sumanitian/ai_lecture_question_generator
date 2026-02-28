from fastapi import APIRouter, UploadFile, File
import os
import json

from services.pdf_processor import extract_text_from_pdf
from services.question_generator import generate_questions

from utils.auth import get_current_user
from fastapi import Depends

from database import SessionLocal
from models import Question

router = APIRouter()

UPLOAD_FOLDER = "documents"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload-lecture")
async def upload_lecture(user = Depends(get_current_user), file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # Extract text
    lecture_text = extract_text_from_pdf(file_path)

    # Generate questions using AI
    questions = generate_questions(lecture_text)

    db = SessionLocal()

    for q in questions:

        question_record = Question(
            question_text=q["question"],
            question_type=q["type"],
            options=json.dumps(q.get("options", []))  # store options as JSON
        )

        db.add(question_record)

    db.commit()

    print("Extracted text preview:")
    print(lecture_text[:500])

    return {
        "message": "File processed and questions stored",
        "questions_generated": len(questions)
    }