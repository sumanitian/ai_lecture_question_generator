import random

def generate_questions(text):

    sentences = text.split('.')

    questions = []
    
    for sentence in sentences[:5]:

        sentence = sentence.strip()

        if len(sentence) > 20:

            question = {
                "question": f"What is mean by: {sentence}?",
                "type": "Short Answer",
                "difficulty": random.choice(["Easy", "Medium", "Hard"])
            }
            questions.append(question)
    return questions