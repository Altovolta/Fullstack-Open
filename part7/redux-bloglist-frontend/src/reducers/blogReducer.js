import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

export const createBlog = createAsyncThunk(
  '/blogs/createBlog',
  async (blogInfo, { rejectWithValue }) => {
    try {
      const newBlog = await blogService.create(blogInfo)
      return newBlog
    } catch (err) {
      return rejectWithValue(err.response.data.error)
    }
  }
)

export const likeBlog = createAsyncThunk(
  '/blogs/likeBlog',
  async (blog, { rejectWithValue }) => {
    try {
      const updatedBlogInfo = { ...blog, likes: blog.likes + 1 }
      return await blogService.update(updatedBlogInfo)
    } catch (err) {
      return rejectWithValue(err.response.data.error)
    }
  }
)

export const removeBlog = createAsyncThunk(
  '/blogs/removeBlog',
  async (id, { rejectWithValue }) => {
    try {
      await blogService.remove({ id })
      return id
    } catch (err) {
      return rejectWithValue(err.response.data.error)
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
        console.log(action)
        const updatedBlogs = state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        )
        updatedBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
        return updatedBlogs
      })
      .addCase(removeBlog.fulfilled, (state, action) => {
        console.log(action.payload)
        const newState = state.filter((blog) => blog.id !== action.payload)
        console.log(newState)
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
