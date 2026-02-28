import json
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def generate_questions(text):

    prompt = f"""
You are an exam generator.

From the lecture content generate:

3 MCQ questions with 4 options
2 Short answer questions.

Return ONLY JSON in this format:

{{
 "mcq":[
   {{
     "question":"text",
     "options":["A","B","C","D"]
   }}
 ],
 "short":[
   {{
     "question":"text"
   }}
 ]
}}

Lecture:
{text}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )

    result = response.choices[0].message.content

    print("AI Response")
    print(result)

    # remove ```json blocks if present
    result = result.replace("```json", "").replace("```", "").strip()

    data = json.loads(result)

    questions = []

    # MCQ
    for q in data.get("mcq", []):
        questions.append({
            "question": q["question"],
            "type": "MCQ",
            "options": q.get("options", [])
        })

    # Short
    for q in data.get("short", []):
        questions.append({
            "question": q["question"],
            "type": "Short Answer",
            "options": []
        })

    return questions