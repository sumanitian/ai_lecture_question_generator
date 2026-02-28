from fastapi import APIRouter, UploadFile, File
import os

router = APIRouter()

UPLOAD_FOLDER = "documents"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/upload-lecture")
async def upload_lecture(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    
    return {"message": f"File '{file.filename}' uploaded successfully", "file_path": file_path}