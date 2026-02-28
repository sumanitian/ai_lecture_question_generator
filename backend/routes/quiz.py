from fastapi import APIRouter
from database import SessionLocal
from models import Quiz, QuizQuestion

router = APIRouter()

@router.post("/create-quiz")
def create_quiz(title: str, question_ids: list[int]):

    db = SessionLocal()

    quiz = Quiz(title=title)

    db.add(quiz)
    db.commit()
    db.refresh(quiz)

    for qid in question_ids:

        quiz_question = QuizQuestion(
            quiz_id=quiz.id,
            question_id=qid
        )

        db.add(quiz_question)

    db.commit()

    return {"message": "Quiz created successfully", "quiz_id": quiz.id}