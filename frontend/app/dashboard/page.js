"use client"

import ProtectedRoute from "@/components/ProtectedRoute"
import { removeToken } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function Dashboard() {

  const router = useRouter()

  const logout = () => {

    removeToken()
    router.push("/login")

  }

  return (

    <ProtectedRoute>

      <div style={{ padding: 40 }}>

        <h1>Dashboard</h1>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            padding: "8px 14px",
            border: "none"
          }}
        >
          Logout
        </button>

        <hr />

        <ul style={{ marginTop: 20, fontSize: 18 }}>

          <li><a href="/upload">Upload Lecture</a></li>
          <li><a href="/questions">Generated Questions</a></li>
          <li><a href="/quiz">Create Quiz</a></li>
          <li><a href="/export">Export Quiz</a></li>

        </ul>

      </div>

    </ProtectedRoute>

  )

}