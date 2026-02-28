"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function UploadPage(){

  const router = useRouter()

  const [file,setFile] = useState(null)

  useEffect(()=>{

    const token = localStorage.getItem("token")

    if(!token){
      router.push("/login")
    }

  },[])

  const uploadLecture = async () => {

    if(!file){
      toast.error("Please select a file")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch(
      "http://127.0.0.1:8000/upload-lecture",
      {
        method:"POST",
        headers:{
          Authorization:"Bearer " + localStorage.getItem("token")
        },
        body: formData
      }
    )

    if(res.status === 401){

      toast.error("Session expired. Login again")

      localStorage.removeItem("token")

      router.push("/login")

      return
    }

    const data = await res.json()

    if(res.ok){

      toast.success(data.questions_generated + " questions generated")

      router.push("/questions")

    }else{

      toast.error("Upload failed")

    }

  }

  return(

    <div style={{padding:40}}>

      <h1>Upload Lecture</h1>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <br/><br/>

      <button onClick={uploadLecture}>
        Upload
      </button>

    </div>

  )

}