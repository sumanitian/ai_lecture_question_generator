# AI Lecture Question Generator

![Python](https://img.shields.io/badge/Python-3.10-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-backend-green)
![NextJS](https://img.shields.io/badge/Next.js-frontend-black)
![AI](https://img.shields.io/badge/AI-LLM-orange)
![License](https://img.shields.io/badge/license-MIT-brightgreen)

An **AI-powered web application** that automatically generates exam questions from lecture PDFs.
The system extracts lecture content and uses a **Large Language Model (LLM)** to generate:

* Multiple Choice Questions (MCQ)
* Short Answer Questions

Teachers or instructors can then **create quizzes and export them as professional PDFs.**

---

# Demo Workflow

Upload Lecture → AI Generates Questions → Create Quiz → Export PDF

---

# Key Features

### AI Question Generation

* Generates MCQs automatically
* Generates Short Answer Questions
* Uses LLaMA 3.1 via Groq API

### Lecture Processing

* Upload lecture PDF
* Automatic text extraction

### Quiz Management

* Select generated questions
* Create quizzes
* Store quizzes in database

### PDF Export

* Export quiz to formatted PDF
* MCQ options included
* Clean printable layout

### Authentication

* User Signup
* User Login
* JWT-based authentication
* Secure API endpoints

---

# Tech Stack

## Frontend

* Next.js
* React
* JavaScript
* React Hot Toast

## Backend

* FastAPI
* Python
* SQLAlchemy
* ReportLab (PDF generation)

## AI Model

* Groq API
* LLaMA 3.1 8B Instant

## Database

* SQLite

---

# System Architecture

```
User
 │
 ▼
Frontend (Next.js)
 │
 ├── Upload Lecture
 ├── View Questions
 ├── Create Quiz
 └── Export Quiz
 │
 ▼
FastAPI Backend
 │
 ├── PDF Processing
 ├── AI Question Generation
 ├── Quiz Management
 └── PDF Export
 │
 ▼
Database (SQLite)
 │
 ├── Users
 ├── Questions
 ├── Quizzes
 └── QuizQuestions
```

---

# Project Structure

```
ai-lecture-question-generator

backend
│
├── routes
│   ├── upload.py
│   ├── questions.py
│   ├── quiz.py
│   └── auth.py
│
├── services
│   ├── pdf_processor.py
│   ├── question_generator.py
│   └── pdf_generator.py
│
├── models.py
├── database.py
└── main.py


frontend
│
├── app
│   ├── upload
│   ├── questions
│   ├── quiz
│   ├── export
│   ├── login
│   └── signup
│
└── layout.js
```

---

# Installation Guide

## 1 Clone Repository

```
git clone https://github.com/yourusername/ai-lecture-question-generator.git
cd ai-lecture-question-generator
```

---

# Backend Setup

## Create Virtual Environment

```
python -m venv ailecture
```

Activate

```
ailecture\Scripts\activate
```

---

## Install Dependencies

```
pip install -r requirements.txt
```

---

## Configure Environment Variables

Create `.env` inside **backend folder**

```
GROQ_API_KEY=your_groq_api_key

SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

## Run FastAPI Server

```
uvicorn main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

# Frontend Setup

Navigate to frontend folder

```
cd frontend
```

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

Frontend runs on

```
http://localhost:3000
```

---

# Application Workflow

### Step 1 — Signup / Login

Users create an account and login.

---

### Step 2 — Upload Lecture

Upload a **PDF lecture document**.

---

### Step 3 — AI Question Generation

The system extracts text and generates:

* 3 MCQ Questions
* 2 Short Answer Questions

---

### Step 4 — Create Quiz

Select questions and create a quiz.

---

### Step 5 — Export Quiz

Enter Quiz ID and download the quiz as a **PDF file**.

---

# Example Generated Quiz

```
Quiz Title: Database Systems

Q1. What is the purpose of SQL DISTINCT?

A) Remove duplicate rows
B) Delete records
C) Create indexes
D) Join tables


Q2. Explain the difference between a subquery and a WITH clause.
```

---

# API Endpoints

## Authentication

```
POST /signup
POST /login
```

---

## Lecture Processing

```
POST /upload-lecture
```

---

## Questions

```
GET /questions
```

---

## Quiz

```
POST /create-quiz
GET /export-quiz/{quiz_id}
```

---

# Security

* Passwords hashed with **bcrypt**
* JWT-based authentication
* Protected API routes

---

# Future Improvements

* Question difficulty classification
* Quiz preview before download
* Edit generated questions
* AI generated exam papers
* Support for DOCX / PPT lectures
* Instructor dashboard

---

# Screenshots

Add screenshots here after uploading images.

Example:

```
![Upload Lecture](screenshots/upload.png)
![Generated Questions](screenshots/questions.png)
![Create Quiz](screenshots/quiz.png)
```

---

# Author

Suman Prasad

---

# License

MIT License
