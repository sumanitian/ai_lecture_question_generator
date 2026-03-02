"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProtectedRoute from "@/components/ProtectedRoute"
import { apiFetch } from "@/lib/api"

export default function QuizPage() {

  const [questions, setQuestions] = useState([])
  const [selected, setSelected] = useState([])
  const [title, setTitle] = useState("")

  useEffect(() => {

    apiFetch("http://127.0.0.1:8000/questions")
      .then(res => res.json())
      .then(setQuestions)

  }, [])

  const toggle = (id) => {

    if (selected.includes(id)) {
      setSelected(selected.filter(q => q !== id))
    } else {
      setSelected([...selected, id])
    }

  }

  const create = async () => {

    const ids = selected.join(",")

    const res = await apiFetch(
      `http://127.0.0.1:8000/create-quiz?title=${title}&question_ids=${ids}`,
      { method: "POST" }
    )

    const data = await res.json()

    toast.success("Quiz created ID " + data.quiz_id)

  }

  return (

    <ProtectedRoute>

      <div style={{ padding: 40, maxWidth: 900, margin: "auto" }}>

        <h1>Create Quiz</h1>

        <input
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        {questions.map((q) => (
          <div key={q.id}>

            <input
              type="checkbox"
              checked={selected.includes(q.id)}
              onChange={() => toggle(q.id)}
            />

            {q.question}

          </div>
        ))}

        <br /><br />

        <button onClick={create}>Create Quiz</button>

      </div>

    </ProtectedRoute>

  )

}