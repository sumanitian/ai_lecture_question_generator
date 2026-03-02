"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isLoggedIn } from "@/lib/auth"

export default function ProtectedRoute({ children }) {

  const router = useRouter()

  useEffect(() => {

    if (!isLoggedIn()) {
      router.push("/login")
    }

  }, [])

  return children
}