export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial"
    }}>

      <h1 style={{fontSize:40}}>
        AI Lecture Question Generator
      </h1>

      <p style={{marginTop:10}}>
        Generate quizzes automatically from lecture PDFs
      </p>

      <div style={{marginTop:30}}>

        <a href="/login">
          <button style={{
            padding:"10px 20px",
            marginRight:10
          }}>
            Login
          </button>
        </a>

        <a href="/signup">
          <button style={{
            padding:"10px 20px"
          }}>
            Signup
          </button>
        </a>

      </div>

      <div style={{marginTop:50}}>

        <h3>Features</h3>

        <ul>
          <li>Upload lecture PDF</li>
          <li>AI generates questions</li>
          <li>Create quizzes</li>
          <li>Download quiz as PDF</li>
        </ul>

      </div>

    </div>
  )
}