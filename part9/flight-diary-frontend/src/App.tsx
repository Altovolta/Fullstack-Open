import { useEffect, useState } from "react"
import type { DiaryEntry } from "./types"
import diaryService from "./services/diaryService"

function App() {

  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    diaryService.getAll().then(data => setDiaries(data))
  }, [])


  return (
    <>
    <h1>Flight diaries</h1>
    {diaries.map(diary => (
      <div key={diary.id}>
        <h3>{diary.date}</h3>
        <p> Visibility: {diary.visibility} </p>
        <p> Weather: {diary.weather} </p>
        <p> Comment {diary.comment}</p>
      </div>
    ))}
    </>
  )
}

export default App
