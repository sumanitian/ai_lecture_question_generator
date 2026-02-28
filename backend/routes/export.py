from fastapi import APIRouter
from services.pdf_generator import generate_quiz_pdf

router = APIRouter()

@router.get("/export-quiz/{quiz_id}")
def export_quiz(quiz_id: int):

    file_name = generate_quiz_pdf(quiz_id)

    return {
        "message": "Quiz PDF generated",
        "file": file_name
    }