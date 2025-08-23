import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { useNotification } from './hooks/useNotification'

const App = () => {
  const [_, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const notifyWith = useNotification()

  useEffect(() => {
    const userItem = window.localStorage.getItem('blogUser')
    if (userItem) {
      const loggedUser = JSON.parse(userItem)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const blogFormRef = useRef()

  //TODO: sort data
  const queryResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })

  if (queryResult.isLoading) {
    return <div>Loding blogs...</div>
  }

  const blogs = queryResult.data

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
      const message = err.response.data.error
      notifyWith({ message, isError: true })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogUser')
    setUser(null)
    blogService.setToken('')
  }

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
        <Blog key={blog.id} blog={blog} currentUser={user} />
      ))}
    </div>
  )
}

export default App
