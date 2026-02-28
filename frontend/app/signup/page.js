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
    toast.error("All fields are required")
    return
  }

  setLoading(true)

  try{

    const res = await fetch("http://127.0.0.1:8000/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    })

    const data = await res.json()

    if(res.status === 200 || res.status === 201){

      toast.success("Account created successfully")

      // redirect after short delay
      setTimeout(()=>{
        router.push("/login")
      },1500)

    }else{

      toast.error(data.detail || "Signup failed")

    }

  }catch(error){

    toast.error("Server error")

  }

  setLoading(false)

}

return(

<div style={{
  height:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  background:"#f4f6f8"
}}>

<div style={{
  width:420,
  padding:40,
  background:"white",
  borderRadius:10,
  boxShadow:"0 10px 30px rgba(0,0,0,0.1)"
}}>

<h2 style={{
textAlign:"center",
marginBottom:30
}}>
Create Account
</h2>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
style={{
width:"100%",
padding:12,
border:"1px solid #ddd",
borderRadius:6
}}
/>

<br/><br/>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
style={{
width:"100%",
padding:12,
border:"1px solid #ddd",
borderRadius:6
}}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
style={{
width:"100%",
padding:12,
border:"1px solid #ddd",
borderRadius:6
}}
/>

<br/><br/>

<button
onClick={signup}
disabled={loading}
style={{
width:"100%",
padding:14,
background:"#2563eb",
color:"white",
border:"none",
borderRadius:6,
fontWeight:"bold",
cursor:"pointer"
}}
>
{loading ? "Creating Account..." : "Signup"}
</button>

<br/><br/>

<p style={{textAlign:"center"}}>

Already have an account?  
<a href="/login" style={{color:"#2563eb", marginLeft:5}}>
Login
</a>

</p>

</div>

</div>

)

}