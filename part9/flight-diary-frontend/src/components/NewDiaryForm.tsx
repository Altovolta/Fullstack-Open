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
    } catch (error: unknown) {
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
          type="date"
          value={date}
          max={new Date().toISOString().split("T")[0]}
          onChange={({target}) => setDate(target.value)}
        />
      </div>
        <div>
          visibility: 
          <input 
            type="radio"
            id="greatVisibility"
            name="visibility"
            value="great"
            onChange={({target}) => setVisibility(target.value)}
          />
          <label>great</label>

          <input 
            type="radio"
            id="goodVisibility"
            name="visibility"
            value="good"
            onChange={({target}) => setVisibility(target.value)}
          />
          <label>good</label>

          <input 
            type="radio"
            id="okVisibility"
            name="visibility"
            value="ok"
            onChange={({target}) => setVisibility(target.value)}
          />
          <label>ok</label>
        </div>
      <div>
        weather:
        <input 
            type="radio"
            id="sunnyWeather"
            name="weather"
            value="sunny"
            onChange={({target}) => setWeather(target.value)}
          />
          <label>sunny</label> 
          <input 
            type="radio"
            id="rainyWeather"
            name="weather"
            value="rainy"
            onChange={({target}) => setWeather(target.value)}
          />
          <label>rainy</label> 
          <input 
            type="radio"
            id="cloudyWeather"
            name="weather"
            value="cloudy"
            onChange={({target}) => setWeather(target.value)}
          />
          <label>cloudy</label> 
          <input 
            type="radio"
            id="stormyWeather"
            name="weather"
            value="stormy"
            onChange={({target}) => setWeather(target.value)}
          />
          <label>stormy</label> 
          <input 
            type="radio"
            id="windyWeather"
            name="weather"
            value="windy"
            onChange={({target}) => setWeather(target.value)}
          />
          <label>windy</label> 
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