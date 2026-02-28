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

    <div style={{padding:40}}>

      <h2>Create Quiz</h2>

      <input
        placeholder="Quiz Title"
        onChange={(e)=>setTitle(e.target.value)}
      />

      <br/><br/>

      {questions.map(q=>(
        <div key={q.id}>

          <input
            type="checkbox"
            onChange={()=>toggleQuestion(q.id)}
          />

          {q.question}

        </div>
      ))}

      <br/>

      <button onClick={createQuiz}>
        Create Quiz
      </button>

    </div>

  )

}