import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const createBlog = createAsyncThunk(
  '/blogs/createBlog',
  async (blogInfo, { dispatch }) => {
    try {
      const newBlog = await blogService.create(blogInfo)
      const message = `A new blog '${blogInfo.title}' by ${blogInfo.author} added`

      dispatch(setNotification({ message, isError: false }, 5000))
      return newBlog
    } catch (err) {
      dispatch(
        setNotification(
          { message: err.response.data.error, isError: true },
          5000
        )
      )
    }
  }
)

export const likeBlog = createAsyncThunk(
  '/blogs/likeBlog',
  async (blog, { dispatch }) => {
    try {
      const updatedBlogInfo = { ...blog, likes: blog.likes + 1 }
      const updatedBlog = await blogService.update(updatedBlogInfo)
      const message = `Liked '${blog.title}' by ${blog.author}`
      dispatch(setNotification({ message, isError: false }, 5000))
      return updatedBlog
    } catch (err) {
      dispatch(
        setNotification(
          { message: err.response.data.error, isError: true },
          5000
        )
      )
    }
  }
)

export const removeBlog = createAsyncThunk(
  '/blogs/removeBlog',
  async (blog, { dispatch }) => {
    try {
      await blogService.remove({ id: blog.id })
      const message = `Blog '${blog.title}' deleted`

      dispatch(setNotification({ message, isError: false }, 5000))
      return blog.id
    } catch (err) {
      dispatch(
        setNotification(
          { message: err.response.data.error, isError: true },
          5000
        )
      )
    }
  }
)

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.fulfilled, (state, action) => {
        const newState = [...state, action.payload]
        newState.sort((blog1, blog2) => blog2.likes - blog1.likes)
        return newState
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        const updatedBlogs = state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        )
        updatedBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
        return updatedBlogs
      })
      .addCase(removeBlog.fulfilled, (state, action) => {
        const newState = state.filter((blog) => blog.id !== action.payload)
        return newState
      })
  },
})

export const { addNewBlog, setBlogs, updateBlog, deleteBlog } =
  blogSlice.actions

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer
