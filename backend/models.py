from sqlalchemy import Column, Integer, String, Text
from database import Base

class Question(Base):

    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    question_text = Column(Text)
    question_type = Column(String)
    difficulty = Column(String)