import type { JSX } from "react"
import type { DiaryEntry } from "../types"


interface DiariesProps {
  diaries: DiaryEntry[]
}

const Diaries = (props: DiariesProps): JSX.Element => {
  const diaries = props.diaries
  return (
    <>
    {
      diaries.map(diary => (
      <div key={diary.id}>
        <h3>{diary.date}</h3>
        <p> Visibility: {diary.visibility} </p>
        <p> Weather: {diary.weather} </p>
      </div>
    ))}
    </>
  )
}


export default Diaries