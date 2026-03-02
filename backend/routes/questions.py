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

@router.put("/questions/{question_id}")
def update_question(question_id: int, data: dict):

    db = SessionLocal()

    question = db.query(Question).filter(
        Question.id == question_id
    ).first()

    if not question:
        return {"error": "Question not found"}

    question.question_text = data["question"]
    question.question_type = data["type"]
    question.options = json.dumps(data.get("options", []))

    db.commit()

    return {"message": "Question updated"}