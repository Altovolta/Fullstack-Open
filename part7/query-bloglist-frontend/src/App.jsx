import { useContext, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { useNotification } from './hooks/useNotification'
import { useUser } from './hooks/useUser'
import UserContext from './contexts/userContext'

const App = () => {
  const notifyWith = useNotification()
  const [_, userDispatch] = useContext(UserContext)

  useEffect(() => {
    const userItem = window.localStorage.getItem('blogUser')
    if (userItem) {
      const user = JSON.parse(userItem)
      userDispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }, [userDispatch])

  const user = useUser()
  const blogFormRef = useRef()

  //TODO: sort data
  const queryResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })

  const onLogin = async ({ username, password }) => {
    try {
      const currentUser = await loginService.login({
        username,
        password,
      })
      user.logIn(currentUser)
    } catch (err) {
      const message = err.response.data.error
      notifyWith({ message, isError: true })
    }
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
    )
  }

  if (queryResult.isLoading) {
    return <div>Loading blogs...</div>
  }

  const blogs = queryResult.data

  if (user.currentUser === null) {
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
        {user.currentUser.name} logged in{' '}
        <button onClick={user.logOut}>logout</button>
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
