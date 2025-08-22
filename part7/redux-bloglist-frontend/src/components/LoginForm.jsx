import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const clearLogin = () => {
    setUsername('')
    setPassword('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    clearLogin()
  }

  return (
    <>
      <h2>Log in</h2>
      <form onSubmit={onSubmit} data-testid="login-form">
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            name="Username"
            data-testid="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            name="Password"
            data-testid="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm
