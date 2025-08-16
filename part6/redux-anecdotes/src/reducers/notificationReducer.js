import { createSlice } from "@reduxjs/toolkit";

const MILISECONDS = 1000

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const { createNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async dispatch => {

    dispatch(createNotification(message))

    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * MILISECONDS)
  }
}


export default notificationSlice.reducer


