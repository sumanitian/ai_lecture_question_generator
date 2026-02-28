# AI Lecture Question Generator

An AI-powered web application that automatically generates exam questions from lecture notes or PDF documents.  
The system uses a Large Language Model (LLM) to extract important concepts and generate **Multiple Choice Questions (MCQ)** and **Short Answer Questions**, allowing educators to quickly create quizzes and export them as PDF.

---

## Features

- User Authentication (Signup & Login)
- Upload Lecture Notes (PDF)
- Automatic Question Generation using AI
- Supports:
  - Multiple Choice Questions (MCQ)
  - Short Answer Questions
- View Generated Questions
- Create Quiz from Selected Questions
- Export Quiz as PDF
- Secure API with JWT Authentication
- Modern Web Interface using Next.js

---

## Tech Stack

### Frontend
- Next.js
- React
- JavaScript
- React Hot Toast (notifications)

### Backend
- FastAPI
- Python
- SQLAlchemy
- ReportLab (PDF generation)

### AI Model
- Groq API
- LLaMA 3.1 (8B Instant)

### Database
- SQLite

---

## Project Architecture
Frontend (Next.js)
│
├── Upload Lecture Page\
├── Generated Questions Page
├── Create Quiz Page
├── Export Quiz Page
└── Authentication (Login / Signup)

Backend (FastAPI)
│
├── PDF Text Extraction
├── AI Question Generation
├── Question Storage
├── Quiz Creation
└── PDF Export

Database
│
├── Users
├── Questions
├── Quizzes
└── QuizQuestions
