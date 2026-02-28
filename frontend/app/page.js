export default function Home() {
  return (
    <div style={{padding:40}}>
      <h1>AI Lecture Question Generator</h1>

      <ul>
        <li><a href="/upload">Upload Lecture</a></li>
        <li><a href="/questions">View Questions</a></li>
        <li><a href="/quiz">Create Quiz</a></li>
        <li><a href="/export">Download Quiz PDF</a></li>
      </ul>
    </div>
  )
}