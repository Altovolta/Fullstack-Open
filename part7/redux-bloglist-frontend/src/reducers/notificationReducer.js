import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  isError: false,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return { message: null, isError: false }
    },
  },
})

export const { createNotification, clearNotification } =
  notificationSlice.actions

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch(createNotification(notification))

    setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

export default notificationSlice.reducer
