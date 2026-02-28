"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard(){

  const router = useRouter()

  useEffect(()=>{

    const token = localStorage.getItem("token")

    if(!token){
      router.push("/login")
    }

  },[])

  const logout = () => {

    localStorage.removeItem("token")

    router.push("/login")

  }

  return(

    <div style={{padding:40}}>

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}>

        <h1>Dashboard</h1>

        <button
          onClick={logout}
          style={{
            background:"#ef4444",
            color:"white",
            padding:"8px 14px",
            border:"none",
            cursor:"pointer"
          }}
        >
          Logout
        </button>

      </div>

      <hr/>

      <ul style={{marginTop:20,fontSize:18}}>

        <li><a href="/upload">Upload Lecture</a></li>
        <li><a href="/questions">Generated Questions</a></li>
        <li><a href="/quiz">Create Quiz</a></li>
        <li><a href="/export">Export Quiz</a></li>

      </ul>

    </div>

  )

}