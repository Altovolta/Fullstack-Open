import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdote'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload
      const newState = state.map(anecdote => 
        anecdote.id !== updatedAnecdote.id 
        ? anecdote 
        : updatedAnecdote
      )

      newState.sort((an1, an2) => an2.votes - an1.votes)
      return newState
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload 
    }
  }
})

export const { appendAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newNote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newNote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer