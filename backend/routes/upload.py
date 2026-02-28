from fastapi import APIRouter, UploadFile, File
import os
from services.pdf_processor import extract_text_from_pdf
from services.question_generator import generate_questions

router = APIRouter()

UPLOAD_FOLDER = "documents"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/upload-lecture")
async def upload_lecture(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # Extract text from pdf
    lecture_text = extract_text_from_pdf(file_path)

    questions = generate_questions(lecture_text)
    
    return {
        "message" : "File processed successfully",
        "generated_questions": questions
    }