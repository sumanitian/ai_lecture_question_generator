"use client"

import { useState } from "react"

export default function UploadPage(){

  const [file,setFile] = useState(null)

  const uploadFile = async () => {

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch(
      "http://127.0.0.1:8000/upload-lecture",
      {
        method:"POST",
        body:formData
      }
    )

    const data = await res.json()

    alert("Questions Generated: " + data.questions_generated)

  }

  return(

    <div style={{padding:40}}>

      <h2>Upload Lecture</h2>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <br/><br/>

      <button onClick={uploadFile}>
        Upload Lecture
      </button>

    </div>

  )
}