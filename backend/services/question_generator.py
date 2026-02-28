import random

def generate_questions(text):

    sentences = text.split('.')

    questions = []
    
    for sentence in sentences[:5]:

        sentence = sentence.strip()

        if len(sentence) > 20:

            # Short answer question
            short_question = {
                "question": f"What is mean by: {sentence}?",
                "type": "Short Answer",
                "difficulty": random.choice(["Easy", "Medium", "Hard"])
            }
            questions.append(short_question)

            # MCQ question
            mcq_question = {
                "question": f"What does the following statement describe?\n{sentence}",
                "type": "MCQ",
                "options": [
                    sentence,
                    "An unrelated concept",
                    "A random statement",
                    "None of the above"
                ],
                "answer": sentence
            }
            questions.append(mcq_question)
            
    return questions