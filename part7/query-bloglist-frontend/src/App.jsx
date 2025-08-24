import { useContext, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import Home from './pages/Home'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

import { useNotification } from './hooks/useNotification'
import { useUser } from './hooks/useUser'
import UserContext from './contexts/userContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Users from './pages/Users'

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

  const queryResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    select: (data) => data.sort((a, b) => b.likes - a.likes),
  })

  const userQueryResult = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
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

  if (queryResult.isLoading || userQueryResult.isLoading) {
    return <div>Loading data...</div>
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
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.currentUser.name} logged in{' '}
        <button onClick={user.logOut}>logout</button>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
