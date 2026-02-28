from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from database import SessionLocal
from models import Quiz, QuizQuestion, Question
import json


def generate_quiz_pdf(quiz_id):

    db = SessionLocal()

    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()

    quiz_questions = db.query(QuizQuestion).filter(
        QuizQuestion.quiz_id == quiz_id
    ).all()

    file_name = f"quiz_{quiz_id}.pdf"

    c = canvas.Canvas(file_name, pagesize=letter)

    y = 750

    # Title
    c.setFont("Helvetica-Bold", 18)
    clean_title = quiz.title.replace('"', '').replace("title:", "").strip()
    c.drawCentredString(300, y, clean_title)

    y -= 50

    c.setFont("Helvetica", 12)

    question_number = 1

    for qq in quiz_questions:

        question = db.query(Question).filter(
            Question.id == qq.question_id
        ).first()

        if question is None:
            continue

        # Clean text
        clean_text = question.question_text.replace("\n", " ").replace("\r", " ")

        text = f"Q{question_number}. {clean_text}"

        # Wrap long lines
        max_length = 90
        lines = [text[i:i + max_length] for i in range(0, len(text), max_length)]

        for line in lines:

            if y < 100:
                c.showPage()
                c.setFont("Helvetica", 12)
                y = 750

            c.drawString(50, y, line)
            y -= 20

        # ----------------------------
        # PRINT MCQ OPTIONS
        # ----------------------------
        if question.question_type == "MCQ" and question.options:

            options = json.loads(question.options)

            labels = ["A", "B", "C", "D"]

            for i, option in enumerate(options):

                option_text = f"{labels[i]}) {option}"

                option_lines = [
                    option_text[j:j + 90]
                    for j in range(0, len(option_text), 90)
                ]

                for line in option_lines:

                    if y < 100:
                        c.showPage()
                        c.setFont("Helvetica", 12)
                        y = 750

                    c.drawString(70, y, line)
                    y -= 18

        y -= 10
        question_number += 1

    c.save()

    return file_name