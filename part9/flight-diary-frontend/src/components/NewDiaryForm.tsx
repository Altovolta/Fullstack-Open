import React, { useState, type JSX } from "react";
import diaryService from "../services/diaryService";
import type { CallbackFunction, NewDiaryEntry } from "../types";
import axios from 'axios'

interface NewDiaryFormProps {
  handleCreation: CallbackFunction
  setNotification: React.Dispatch<React.SetStateAction<string>>
}

const NewDiaryForm = (props: NewDiaryFormProps): JSX.Element => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newEntry: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    }

    try {
      const newDiary = await diaryService.create(newEntry)
      props.handleCreation(newDiary)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        props.setNotification(error.response?.data)

        setTimeout(() => {
          props.setNotification('')
        }, 5000 )
      }
    }

    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')

  }

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={onSubmit}>
      <div>
        date: 
        <input 
          type="text"
          value={date}
          onChange={({target}) => setDate(target.value)}
        />
      </div>
      <div>
        visibility: 
        <input 
          type="text"
          value={visibility}
          onChange={({target}) => setVisibility(target.value)}
        />
      </div>
      <div>
        weather: 
        <input 
          type="text"
          value={weather}
          onChange={({target}) => setWeather(target.value)}
        />
      </div>
      <div>
        comment: 
        <input 
          type="text"
          value={comment}
          onChange={({target}) => setComment(target.value)}
        />
      </div>
      <button type="submit">add</button>
      </form>
    </>
  )

}


export default NewDiaryForm