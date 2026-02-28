import json
from fastapi import APIRouter
from database import SessionLocal
from models import Question
from utils.auth import get_current_user
from fastapi import Depends

router = APIRouter()

@router.get("/questions")
def get_questions(user = Depends(get_current_user)):

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