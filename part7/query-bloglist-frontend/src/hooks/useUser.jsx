import { useContext } from 'react'
import UserContext from '../contexts/userContext'
import blogService from '../services/blogs'

export const useUser = () => {
  const [currentUser, userDispatch] = useContext(UserContext)

  const logIn = (user) => {
    window.localStorage.setItem('blogUser', JSON.stringify(user))
    blogService.setToken(user.token)
    userDispatch({ type: 'SET', payload: user })
  }

  const logOut = () => {
    window.localStorage.removeItem('blogUser')
    userDispatch({ type: 'CLEAR' })
    blogService.setToken('')
  }

  return { currentUser, logIn, logOut }
}
