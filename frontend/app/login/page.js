"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function LoginPage(){

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const login = async () => {

    const res = await fetch("http://127.0.0.1:8000/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await res.json()

    if(res.ok){

      // store token
      localStorage.setItem("token", data.access_token)

      toast.success("Login successful")

      router.push("/dashboard")

    }else{

      toast.error("Invalid credentials")

    }

  }

  return(

    <div style={{
      padding:40,
      maxWidth:400,
      margin:"auto"
    }}>

      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        style={{width:"100%",padding:10}}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        style={{width:"100%",padding:10}}
      />

      <br/><br/>

      <button
        onClick={login}
        style={{
          width:"100%",
          padding:10,
          background:"#2563eb",
          color:"white",
          border:"none",
          cursor:"pointer"
        }}
      >
        Login
      </button>

    </div>

  )

}