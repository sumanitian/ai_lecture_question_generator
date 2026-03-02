"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProtectedRoute from "@/components/ProtectedRoute"
import { apiFetch } from "@/lib/api"

export default function QuestionsPage() {

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const load = async () => {

      try {

        const res = await apiFetch("http://127.0.0.1:8000/questions")

        const data = await res.json()

        setQuestions(data)

      } catch {

        toast.error("Failed to load questions")

      }

      setLoading(false)

    }

    load()

  }, [])

  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>
  }

  return (

    <ProtectedRoute>

      <div style={{ padding: 40, maxWidth: 900, margin: "auto" }}>

        <h2>Generated Questions</h2>

        {questions.map((q, index) => (

          <div key={q.id} style={{ border: "1px solid #ddd", padding: 20, marginBottom: 15 }}>

            <b>Q{index + 1}.</b> {q.question}

            <div style={{ fontSize: 13, color: "#666" }}>{q.type}</div>

            {q.type === "MCQ" && q.options?.map((opt, i) => (
              <div key={i}>{String.fromCharCode(65 + i)}) {opt}</div>
            ))}

          </div>

        ))}

      </div>

    </ProtectedRoute>

  )

}