import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addNewBlog(state, action) {
      const newState = [...state, action.payload]
      newState.sort((blog1, blog2) => blog2.likes - blog1.likes)
      return newState
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updatedBlogs = state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
      updatedBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
      return updatedBlogs
    },
  },
})

export const { addNewBlog, setBlogs, updateBlog } = blogSlice.actions

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogInfo) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogInfo)
    console.log(newBlog)

    dispatch(addNewBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlogInfo = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(updatedBlogInfo)
    dispatch(updateBlog(updatedBlog))
  }
}

export default blogSlice.reducer
