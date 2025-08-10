const LoginForm = ({
    handleLogin,
    username,
    setUsername,
    password,
    setPassword
}) => {
    return(
      <>
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <div>
            username  
            <input 
            type='text' 
            value={username} 
            onChange={({target}) => setUsername(target.value)}
            name='Username'/>
          </div>
          <div>
            password 
            <input 
            type='password' 
            value={password} 
            onChange={({target}) => setPassword(target.value)}
            name='Password'/>
          </div>
          <button type='submit'>Login</button>
        </form>
      </>
    )
}

export default LoginForm
