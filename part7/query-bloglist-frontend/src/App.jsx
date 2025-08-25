import { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Header from './components/Header'

import Home from './pages/Home'
import Users from './pages/Users'
import User from './pages/User'

import blogService from './services/blogs'
import loginService from './services/login'

import { useNotification } from './hooks/useNotification'
import { useUser } from './hooks/useUser'

import UserContext from './contexts/userContext'
import Blog from './pages/Blog'

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

  if (user.currentUser === null) {
    return (
      <div>
        <Notification />
        <LoginForm onLogin={onLogin} />
      </div>
    )
  }

  return (
    <Container>
      <h2>blogs</h2>
      <Header />
      <Notification />
      <Routes>
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  )
}

export default App
