"use client"

import { useEffect, useState } from "react"

export default function QuizPage(){

  const [questions,setQuestions] = useState([])
  const [selected,setSelected] = useState([])
  const [title,setTitle] = useState("")

  useEffect(()=>{

    fetch("http://127.0.0.1:8000/questions")
      .then(res=>res.json())
      .then(data=>setQuestions(data))

  },[])

  const toggleQuestion = (id)=>{

    if(selected.includes(id)){
      setSelected(selected.filter(q=>q!==id))
    }else{
      setSelected([...selected,id])
    }

  }

  const createQuiz = async ()=>{

    const ids = selected.join(",")

    const res = await fetch(
      `http://127.0.0.1:8000/create-quiz?title=${title}&question_ids=${ids}`,
      {method:"POST"}
    )

    const data = await res.json()

    alert("Quiz Created with ID: "+data.quiz_id)

  }

  return(

    <div style={{
      padding:40,
      maxWidth:900,
      margin:"auto",
      fontFamily:"Arial"
    }}>

      <h1 style={{marginBottom:20}}>Create Quiz</h1>

      <input
        placeholder="Enter Quiz Title"
        onChange={(e)=>setTitle(e.target.value)}
        style={{
          padding:10,
          width:"100%",
          border:"1px solid #ccc",
          borderRadius:6,
          marginBottom:30
        }}
      />

      {questions.map((q,index)=>(

        <div
          key={q.id}
          style={{
            border:"1px solid #ddd",
            padding:20,
            marginBottom:15,
            borderRadius:8,
            background:selected.includes(q.id) ? "#eef6ff" : "#fafafa",
            transition:"0.2s"
          }}
        >

          <label style={{cursor:"pointer"}}>

            <input
              type="checkbox"
              checked={selected.includes(q.id)}
              onChange={()=>toggleQuestion(q.id)}
              style={{marginRight:10}}
            />

            <b>Q{index+1}.</b> {q.question}

          </label>

          <div style={{
            marginTop:8,
            fontSize:13,
            color:"#666"
          }}>
            Type: {q.type}
          </div>

        </div>

      ))}

      <button
        onClick={createQuiz}
        style={{
          marginTop:20,
          padding:"12px 20px",
          background:"#2563eb",
          color:"white",
          border:"none",
          borderRadius:6,
          cursor:"pointer",
          fontSize:16
        }}
      >
        Create Quiz
      </button>

    </div>

  )

}