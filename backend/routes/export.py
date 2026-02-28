from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from services.pdf_generator import generate_quiz_pdf

router = APIRouter()

@router.get("/export-quiz/{quiz_id}")
def export_quiz(quiz_id: int):

    pdf_buffer = generate_quiz_pdf(quiz_id)

    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=quiz_{quiz_id}.pdf"
        }
    )