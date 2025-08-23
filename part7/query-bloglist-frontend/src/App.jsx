import { useEffect, useRef, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { useNotification } from './hooks/useNotification'

import UserContext from './contexts/userContext'

const App = () => {
  const [loggedUser, userDispatch] = useContext(UserContext)
  const notifyWith = useNotification()

  useEffect(() => {
    const userItem = window.localStorage.getItem('blogUser')
    if (userItem) {
      const loggedUser = JSON.parse(userItem)
      userDispatch({ type: 'SET', payload: loggedUser })
      blogService.setToken(loggedUser.token)
    }
  }, [userDispatch])

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
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('blogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'SET', payload: user })
    } catch (err) {
      const message = err.response.data.error
      notifyWith({ message, isError: true })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogUser')
    userDispatch({ type: 'CLEAR' })
    blogService.setToken('')
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
    )
  }

  if (loggedUser === null) {
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
        {loggedUser.name} logged in{' '}
        <button onClick={() => handleLogout()}>logout</button>
      </div>
      {blogForm()}
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
