from fastapi import APIRouter, UploadFile, File
import os
from services.pdf_processor import extract_text_from_pdf

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
    
    return {
        "message" : "File uploaded successfully",
        "file": file.filename,
        "text_preview": lecture_text[:500]
    }