"use client"

import { useState } from "react"

export default function ExportPage(){

  const [quizId,setQuizId] = useState("")

  const downloadQuiz = () => {

    window.open(
      `http://127.0.0.1:8000/export-quiz/${quizId}`
    )

  }

  return(

    <div style={{padding:40}}>

      <h2>Download Quiz PDF</h2>

      <input
        placeholder="Quiz ID"
        onChange={(e)=>setQuizId(e.target.value)}
      />

      <br/><br/>

      <button onClick={downloadQuiz}>
        Download PDF
      </button>

    </div>

  )
}