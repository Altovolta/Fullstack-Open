import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addNewBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { addNewBlog, setBlogs } = blogSlice.actions

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    console.log(blogs)
    blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer
