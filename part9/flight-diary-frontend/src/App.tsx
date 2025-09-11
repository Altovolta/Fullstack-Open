import { useEffect, useState } from "react"
import type { DiaryEntry } from "./types"
import diaryService from "./services/diaryService"
import Diaries from "./components/Diaries"
import NewDiaryForm from "./components/NewDiaryForm"

function App() {

  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    diaryService.getAll().then(data => setDiaries(data))
  }, [])

  const handleNewEntry = (entry: DiaryEntry) => {
    setDiaries(diaries.concat(entry))
  }

  return (
    <>
    <NewDiaryForm handleCreation={handleNewEntry} />
    <h1>Flight diaries</h1>
    <Diaries diaries={diaries} />
    </>
  )
}

export default App
