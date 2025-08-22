import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

export const loginUser = createAsyncThunk(
  '/blogs/login',
  async ({ username, password }, { dispatch }) => {
    try {
      const userResponse = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('blogUser', JSON.stringify(userResponse))
      blogService.setToken(userResponse.token)
      return userResponse
    } catch (err) {
      console.log(err)

      dispatch(
        setNotification(
          { message: err.response.data.error, isError: true },
          5000
        )
      )
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    clearUser(state, action) {
      return null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const { setUser, clearUser } = userSlice.actions

export const loadUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('blogUser')
    blogService.setToken('')
    dispatch(clearUser())
  }
}
export default userSlice.reducer
