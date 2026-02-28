from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from utils.auth import get_current_user
from fastapi import Depends
from services.pdf_generator import generate_quiz_pdf

router = APIRouter()

@router.get("/export-quiz/{quiz_id}")
def export_quiz(quiz_id: int, user = Depends(get_current_user)):

    pdf_buffer = generate_quiz_pdf(quiz_id)

    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=quiz_{quiz_id}.pdf"
        }
    )