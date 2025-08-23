import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState({
    message: null,
    isError: false,
  })

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const userItem = window.localStorage.getItem('blogUser')
    if (userItem) {
      const loggedUser = JSON.parse(userItem)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const setNotificarionTimeout = () => {
    setTimeout(() => {
      setNotification({ message: null, isError: false })
    }, 5000)
  }

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
      setNotification({ message: err.response.data.error, isError: true })
    }

    setNotificarionTimeout()
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogUser')
    setUser(null)
    blogService.setToken('')
  }

  const onNewBlog = async ({ title, author, url }) => {
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      })

      setBlogs(blogs.concat(newBlog))
      setNotification({
        message: `A new blog '${newBlog.title}' by ${newBlog.author} added`,
        isError: false,
      })

      blogFormRef.current.toggleVisibility()
    } catch (err) {
      setNotification({ message: err.response.data.error, isError: true })
    }

    setNotificarionTimeout()
  }

  const onLike = async (blog) => {
    const updatedBlogInfo = { ...blog, likes: blog.likes + 1 }

    try {
      const updatedBlog = await blogService.update(updatedBlogInfo)
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
      updatedBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
      setBlogs(updatedBlogs)
    } catch (err) {
      setNotification({ message: err.response.data.error, isError: true })
    }

    setNotificarionTimeout()
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

        setNotification({
          message: `Blog '${blogToRemove.title}' deleted`,
          isError: false,
        })
      } catch (err) {
        setNotification({ message: err.response.data.error, isError: true })
      }

      setNotificarionTimeout()
    }
  }

  const blogFormRef = useRef()
  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm onNewBlog={onNewBlog} />
      </Togglable>
    )
  }

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm onLogin={onLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
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
          onLike={onLike}
          removeBlog={removeBlog}
          currentUser={user}
        />
      ))}
    </div>
  )
}

export default App
