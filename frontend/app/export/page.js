"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import ProtectedRoute from "@/components/ProtectedRoute"
import { apiFetch } from "@/lib/api"

export default function ExportPage() {

  const [quizId, setQuizId] = useState("")

  const download = async () => {

    const res = await apiFetch(
      `http://127.0.0.1:8000/export-quiz/${quizId}`
    )

    const blob = await res.blob()

    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `quiz_${quizId}.pdf`

    a.click()

    toast.success("Downloaded")

  }

  return (

    <ProtectedRoute>

      <div style={{ padding: 40 }}>

        <h2>Download Quiz PDF</h2>

        <input
          placeholder="Quiz ID"
          onChange={(e) => setQuizId(e.target.value)}
        />

        <br /><br />

        <button onClick={download}>Download</button>

      </div>

    </ProtectedRoute>

  )

}