import random
import re

def clean_text(text):

    text = text.replace("\n", " ")
    text = text.replace("•", "")
    text = re.sub(r'\s+', ' ', text)

    return text


def generate_questions(text):

    text = clean_text(text)

    sentences = text.split(".")

    questions = []

    for sentence in sentences:

        sentence = sentence.strip()

        if len(sentence) > 40:

            short_q = {
                "question": f"Explain the following concept: {sentence}?",
                "type": "Short Answer",
                "difficulty": random.choice(["Easy","Medium","Hard"])
            }

            questions.append(short_q)

            mcq_q = {
                "question": f"Which concept is described below?\n{sentence}",
                "type": "MCQ",
                "difficulty": "Medium"
            }

            questions.append(mcq_q)

        if len(questions) >= 10:
            break

    return questions