"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function QuestionsPage(){

  const router = useRouter()

  const [questions,setQuestions] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    const token = localStorage.getItem("token")

    if(!token){
      router.push("/login")
      return
    }

    fetch(
      "http://127.0.0.1:8000/questions",
      {
        headers:{
          Authorization:"Bearer " + token
        }
      }
    )
      .then(res=>{

        if(res.status === 401){

          localStorage.removeItem("token")
          router.push("/login")

          return
        }

        return res.json()

      })
      .then(data=>{

        if(Array.isArray(data)){
          setQuestions(data)
        }

        setLoading(false)

      })
      .catch(()=>{

        toast.error("Failed to load questions")
        setLoading(false)

      })

  },[])

  if(loading){
    return <div style={{padding:40}}>Loading questions...</div>
  }

  return(

    <div style={{
      padding:40,
      maxWidth:900,
      margin:"auto",
      fontFamily:"Arial"
    }}>

      <h2 style={{marginBottom:20}}>Generated Questions</h2>

      {questions.length === 0 && (
        <p>No questions available</p>
      )}

      {questions.map((q,index)=>(

        <div
          key={q.id}
          style={{
            border:"1px solid #ddd",
            padding:20,
            marginBottom:15,
            borderRadius:8,
            background:"#fafafa"
          }}
        >

          <div style={{marginBottom:6,fontSize:14,color:"#666"}}>
            Type: {q.type}
          </div>

          <p style={{fontSize:16}}>
            <b>Q{index+1}.</b> {q.question}
          </p>

          {/* SHOW MCQ OPTIONS */}

          {q.type === "MCQ" && q.options && q.options.length > 0 && (

            <div style={{marginTop:10,paddingLeft:20}}>

              {q.options.map((opt,i)=>(
                <div key={i} style={{marginTop:4}}>
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