"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function ExportPage(){

  const router = useRouter()

  const [quizId,setQuizId] = useState("")
  const [loading,setLoading] = useState(false)

  useEffect(()=>{

    const token = localStorage.getItem("token")
    if(!token){
      router.push("/login")
      return
    }
  },[])

  const downloadQuiz = async () => {

    if(!quizId){
      toast.error("Enter Quiz ID")
      return
    }

    setLoading(true)

    try{

      const res = await fetch(
        `http://127.0.0.1:8000/export-quiz/${quizId}`,
        {
          headers:{
            Authorization:"Bearer " + localStorage.getItem("token")
          }
        }
      )

      // user not logged in
      if(res.status === 401){
        toast.error("Please login to download quiz")
        setTimeout(()=>{
          window.location.href = "/login"
        },1500)
        return
      }

      if(!res.ok){
        toast.error("Failed to download quiz")
        setLoading(false)
        return
      }

      const blob = await res.blob()

      const url = window.URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = `quiz_${quizId}.pdf`

      document.body.appendChild(a)
      a.click()

      a.remove()

      toast.success("Quiz downloaded")

    }catch(err){

      toast.error("Download failed")

    }

    setLoading(false)

  }

  return(

    <div style={{
      padding:40,
      maxWidth:500,
      margin:"auto",
      fontFamily:"Arial"
    }}>

      <h2 style={{marginBottom:20}}>Download Quiz PDF</h2>

      <input
        placeholder="Enter Quiz ID"
        value={quizId}
        onChange={(e)=>setQuizId(e.target.value)}
        style={{
          width:"100%",
          padding:10,
          border:"1px solid #ccc",
          borderRadius:6
        }}
      />

      <br/><br/>

      <button
        onClick={downloadQuiz}
        disabled={loading}
        style={{
          padding:"10px 20px",
          background:"#2563eb",
          color:"white",
          border:"none",
          borderRadius:6,
          cursor:"pointer"
        }}
      >
        {loading ? "Downloading..." : "Download PDF"}
      </button>

    </div>

  )
}