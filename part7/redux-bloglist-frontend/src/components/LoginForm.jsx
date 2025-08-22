import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const clearLogin = () => {
    setUsername('')
    setPassword('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    await onLogin({ username, password })
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

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default LoginForm
