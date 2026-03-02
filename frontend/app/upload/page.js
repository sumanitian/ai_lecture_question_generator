"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import ProtectedRoute from "@/components/ProtectedRoute"
import { apiFetch } from "@/lib/api"

export default function UploadPage() {

  const [file, setFile] = useState(null)

  const upload = async () => {

    if (!file) {
      toast.error("Select file")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    const res = await apiFetch(
      "http://127.0.0.1:8000/upload-lecture",
      { method: "POST", body: formData }
    )

    const data = await res.json()

    if (res.ok) {
      toast.success(data.questions_generated + " questions generated")
    } else {
      toast.error("Upload failed")
    }

  }

  return (

    <ProtectedRoute>

      <div style={{ padding: 40 }}>

        <h1>Upload Lecture</h1>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <br /><br />

        <button onClick={upload}>Upload</button>

      </div>

    </ProtectedRoute>

  )

}