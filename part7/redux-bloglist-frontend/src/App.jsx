import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const [_, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const userItem = window.localStorage.getItem('blogUser')
    if (userItem) {
      const loggedUser = JSON.parse(userItem)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const onLogin = async ({ username, password }) => {
    try {
      const userResponse = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('blogUser', JSON.stringify(userResponse))
      blogService.setToken(userResponse.token)
      setUser(userResponse)
    } catch (err) {
      dispatch(
        setNotification(
          { message: err.response.data.error, isError: true },
          5000
        )
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogUser')
    setUser(null)
    blogService.setToken('')
  }

  const removeBlog = async (blogToRemove) => {
    const shouldDelete = window.confirm(
      `Remove blog '${blogToRemove.title}' by ${blogToRemove.author}`
    )

    if (shouldDelete) {
      try {
        await blogService.remove({ id: blogToRemove.id })

        const filteredBlogs = blogs.filter(
          (blog) => blog.id !== blogToRemove.id
        )
        setBlogs(filteredBlogs)

        dispatch(
          setNotification(
            {
              message: `Blog '${blogToRemove.title}' deleted`,
              isError: false,
            },
            5000
          )
        )
      } catch (err) {
        dispatch(
          setNotification(
            { message: err.response.data.error, isError: true },
            5000
          )
        )
      }
    }
  }

  const blogFormRef = useRef()
  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
    )
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm onLogin={onLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in{' '}
        <button onClick={() => handleLogout()}>logout</button>
      </div>
      {blogForm()}
      <br />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          removeBlog={removeBlog}
          currentUser={user}
        />
      ))}
    </div>
  )
}

export default App
