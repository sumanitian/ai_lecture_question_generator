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

    <div style={{padding:40,maxWidth:900,margin:"auto"}}>

      <h2 style={{marginBottom:30}}>Generated Questions</h2>

      {questions.length === 0 && <p>No questions generated yet</p>}

      {questions.map((q,index) => (

        <div key={q.id} style={{
          border:"1px solid #ddd",
          padding:20,
          marginBottom:20,
          borderRadius:8,
          background:"#fafafa"
        }}>

          <div style={{marginBottom:10}}>
            <b>Type:</b> {q.type}
          </div>

          <div style={{fontSize:16,marginBottom:10}}>
            <b>Q{index+1}.</b> {q.question}
          </div>

          {/* Show MCQ options */}
          {q.type === "MCQ" && q.options && q.options.length > 0 && (

            <div style={{marginLeft:20}}>

              {q.options.map((opt,i)=>(
                <div key={i} style={{marginBottom:5}}>
                  {String.fromCharCode(65+i)}) {opt}
                </div>
              ))}

            </div>

          )}

        </div>

      ))}

    </div>

  )

}