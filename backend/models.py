from sqlalchemy import Column, Integer, String, Text
from database import Base

class Question(Base):

    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    question_text = Column(Text)
    question_type = Column(String)
    difficulty = Column(String)

class Quiz(Base):

    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)

class QuizQuestion(Base):

    __tablename__ = "quiz_questions"

    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer)
    question_id = Column(Integer)