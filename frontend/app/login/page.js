"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { setToken } from "@/lib/auth"

export default function LoginPage(){

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)

  const login = async () => {

    if(!email || !password){
      toast.error("Enter email and password")
      return
    }

    setLoading(true)

    try{

      const res = await fetch("http://127.0.0.1:8000/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({email,password})
      })

      const data = await res.json()

      if(res.ok){

        setToken(data.access_token)

        toast.success("Login successful")

        router.push("/dashboard")

      }else{

        toast.error("Invalid credentials")

      }

    }catch{

      toast.error("Server error")

    }

    setLoading(false)

  }

  return(

    <div style={{padding:40,maxWidth:400,margin:"auto"}}>

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
        disabled={loading}
        onClick={login}
        style={{
          width:"100%",
          padding:10,
          background:"#2563eb",
          color:"white",
          border:"none"
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

    </div>

  )

}