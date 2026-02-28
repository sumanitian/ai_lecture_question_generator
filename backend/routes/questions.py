import json
from fastapi import APIRouter
from database import SessionLocal
from models import Question

router = APIRouter()

@router.get("/questions")
def get_questions():

    db = SessionLocal()
    questions = db.query(Question).all()

    result = []

    for q in questions:

        options = []

        if q.options:
            options = json.loads(q.options)

        result.append({
            "id": q.id,
            "question": q.question_text,
            "type": q.question_type,
            "options": options
        })

    return result