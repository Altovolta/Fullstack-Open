import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Box, TextField, Typography } from '@mui/material'

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <Typography
        variant="h4"
        sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
      >
        Log in
      </Typography>
      <form onSubmit={onSubmit} data-testid="login-form">
        <TextField
          label="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          name="Username"
          data-testid="username"
          sx={{ marginBottom: '5px', display: 'block' }}
        />
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          name="Password"
          data-testid="password"
          sx={{ marginBottom: '5px', display: 'block' }}
        />
        <Button
          color="inherit"
          sx={{
            backgroundColor: '#92dcec',
            fontWeight: 'bold',
          }}
          type="submit"
        >
          Login
        </Button>
      </form>
    </Box>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default LoginForm
