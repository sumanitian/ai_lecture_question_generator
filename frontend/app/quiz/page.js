"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function QuizPage(){

  const [questions,setQuestions] = useState([])
  const [selected,setSelected] = useState([])
  const [title,setTitle] = useState("")
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    const token = localStorage.getItem("token")

    if(!token){
      window.location.href = "/login"
      return
    }

    fetch("http://127.0.0.1:8000/questions",{
      headers:{
        Authorization:"Bearer "+localStorage.getItem("token")
      }
    })
      .then(res =>{
        if(res.status === 401){
          localStorage.removeItem("token")
          window.location.href = "/login"
          return
        }
        return res.json()
      })
      .then(data => {

        if(Array.isArray(data)){
          setQuestions(data)
        }else{
          setQuestions([])
        }

        setLoading(false)

      })
      .catch(()=>{
        toast.error("Failed to load questions")
        setLoading(false)
      })

  },[])

  const toggleQuestion = (id)=>{

    if(selected.includes(id)){
      setSelected(selected.filter(q=>q!==id))
    }else{
      setSelected([...selected,id])
    }

  }

  const createQuiz = async ()=>{

    if(!title){
      toast.error("Enter quiz title")
      return
    }

    if(selected.length === 0){
      toast.error("Select at least one question")
      return
    }

    const ids = selected.join(",")

    const res = await fetch(
      `http://127.0.0.1:8000/create-quiz?title=${title}&question_ids=${ids}`,
      {
        method:"POST",
        headers:{
          Authorization:"Bearer " + localStorage.getItem("token")
        }
      }
    )

    const data = await res.json()

    if(res.ok){
      toast.success("Quiz Created (ID: "+data.quiz_id+")")
      setSelected([])
      setTitle("")
    }else{
      toast.error("Failed to create quiz")
    }

  }

  if(loading){
    return (
      <div style={{padding:40,textAlign:"center"}}>
        Loading questions...
      </div>
    )
  }

  return(

    <div style={{
      padding:40,
      maxWidth:900,
      margin:"auto",
      fontFamily:"Arial"
    }}>

      {/* HEADER */}

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:20
      }}>
        <h1>Create Quiz</h1>

        <div style={{
          background:"#2563eb",
          color:"white",
          padding:"6px 12px",
          borderRadius:6,
          fontSize:14
        }}>
          Selected: {selected.length}
        </div>
      </div>

      {/* TITLE INPUT */}

      <input
        placeholder="Enter Quiz Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        style={{
          padding:12,
          width:"100%",
          border:"1px solid #ccc",
          borderRadius:6,
          marginBottom:30,
          fontSize:16
        }}
      />

      {/* EMPTY STATE */}

      {questions.length === 0 && (

        <div style={{
          textAlign:"center",
          padding:40,
          border:"1px dashed #ccc",
          borderRadius:8
        }}>
          No questions available.  
          Upload a lecture first.
        </div>

      )}

      {/* QUESTIONS */}

      {questions.map((q,index)=>(

        <div
          key={q.id}
          style={{
            border:"1px solid #e5e5e5",
            padding:20,
            marginBottom:15,
            borderRadius:8,
            background:selected.includes(q.id) ? "#eef6ff" : "#fff",
            transition:"0.2s",
            boxShadow:"0 2px 4px rgba(0,0,0,0.05)"
          }}
        >

          {/* QUESTION HEADER */}

          <div style={{
            display:"flex",
            justifyContent:"space-between",
            marginBottom:8
          }}>

            <label style={{cursor:"pointer"}}>

              <input
                type="checkbox"
                checked={selected.includes(q.id)}
                onChange={()=>toggleQuestion(q.id)}
                style={{marginRight:10}}
              />

              <b>Q{index+1}.</b> {q.question}

            </label>

            <span style={{
              fontSize:12,
              background:"#f3f4f6",
              padding:"3px 8px",
              borderRadius:6
            }}>
              {q.type}
            </span>

          </div>

          {/* MCQ OPTIONS */}

          {q.type === "MCQ" && q.options && q.options.length > 0 && (

            <div style={{
              marginTop:10,
              paddingLeft:30
            }}>

              {q.options.map((opt,i)=>(

                <div
                  key={i}
                  style={{
                    marginTop:5,
                    background:"#f9fafb",
                    padding:"6px 10px",
                    borderRadius:4,
                    fontSize:14
                  }}
                >
                  {String.fromCharCode(65+i)}) {opt}
                </div>

              ))}

            </div>

          )}

        </div>

      ))}

      {/* CREATE QUIZ BUTTON */}

      <div style={{textAlign:"center",marginTop:30}}>

        <button
          onClick={createQuiz}
          disabled={selected.length === 0}
          style={{
            padding:"14px 30px",
            background:selected.length === 0 ? "#ccc" : "#2563eb",
            color:"white",
            border:"none",
            borderRadius:8,
            cursor:"pointer",
            fontSize:16,
            fontWeight:"bold"
          }}
        >
          Create Quiz
        </button>

      </div>

    </div>

  )

}