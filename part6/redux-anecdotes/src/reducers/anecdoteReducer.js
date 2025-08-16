import { createSlice } from "@reduxjs/toolkit"


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      
      const newState = state.map(anecdote => 
        anecdote.id !== id 
        ? anecdote 
        : { ...anecdote, votes: anecdote.votes + 1 }
      )

      newState.sort((an1, an2) => an2.votes - an1.votes)
      return newState
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload 
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer