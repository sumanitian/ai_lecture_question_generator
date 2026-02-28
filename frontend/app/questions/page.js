"use client"

import { useEffect, useState } from "react"

export default function QuestionsPage(){

  const [questions,setQuestions] = useState([])

  useEffect(()=>{

    fetch("http://127.0.0.1:8000/questions")
      .then(res => res.json())
      .then(data => setQuestions(data))

  },[])

  return(

    <div style={{padding:40}}>

      <h2>Generated Questions</h2>

      {questions.length === 0 && <p>No questions generated yet</p>}

      {questions.map(q => (
        <div key={q.id} style={{
          border:"1px solid #ccc",
          padding:10,
          marginBottom:10
        }}>
          <b>Type:</b> {q.type} <br/>
          <b>Difficulty:</b> {q.difficulty}
          <p>{q.question}</p>
        </div>
      ))}

    </div>

  )
}