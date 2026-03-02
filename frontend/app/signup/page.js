"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function Signup(){

const router = useRouter()

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)

const signup = async ()=>{

  if(!name || !email || !password){
    toast.error("All fields required")
    return
  }

  setLoading(true)

  const res = await fetch("http://127.0.0.1:8000/signup",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({name,email,password})
  })

  const data = await res.json()

  if(data.error){
    toast.error(data.error)
  }else{
    toast.success("Account created")
    setTimeout(()=>router.push("/login"),1500)
  }

  setLoading(false)

}

return(

<div style={{padding:40,maxWidth:400,margin:"auto"}}>

<h2>Signup</h2>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
style={{width:"100%",padding:10}}
/>

<br/><br/>

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
onClick={signup}
style={{
width:"100%",
padding:10,
background:"#2563eb",
color:"white",
border:"none"
}}
>
{loading ? "Creating..." : "Signup"}
</button>

</div>

)

}