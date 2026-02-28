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
        result.append({
            "id": q.id,
            "question": q.question_text,
            "type": q.question_type,
            "difficulty": q.difficulty
        })

    return result