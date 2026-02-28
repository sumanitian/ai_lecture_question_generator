from fastapi import APIRouter
from database import SessionLocal
from models import Quiz, QuizQuestion

router = APIRouter()

@router.post("/create-quiz")
def create_quiz(title: str, question_ids: str):

    db = SessionLocal()

    # convert "1,2,3" → [1,2,3]
    ids = [int(i.strip()) for i in question_ids.split(",")]

    quiz = Quiz(title=title)

    db.add(quiz)
    db.commit()
    db.refresh(quiz)

    for qid in ids:

        quiz_question = QuizQuestion(
            quiz_id=quiz.id,
            question_id=qid
        )

        db.add(quiz_question)

    db.commit()

    return {
        "message": "Quiz created successfully",
        "quiz_id": quiz.id
    }