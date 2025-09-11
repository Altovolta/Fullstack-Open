import { useEffect, useState } from "react"
import type { DiaryEntry } from "./types"
import diaryService from "./services/diaryService"
import Diaries from "./components/Diaries"

function App() {

  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    diaryService.getAll().then(data => setDiaries(data))
  }, [])


  return (
    <>
    <h1>Flight diaries</h1>
    <Diaries diaries={diaries} />
    </>
  )
}

export default App
