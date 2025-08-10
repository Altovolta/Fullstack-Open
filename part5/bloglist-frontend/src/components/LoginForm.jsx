import { useState } from "react"

const LoginForm = ({
    onLogin,
}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const clearLogin = () => {
        setUsername('')
        setPassword('')
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        await onLogin({username, password})
        clearLogin() 
    }

    return(
      <>
        <h2>Log in</h2>
        <form onSubmit={onSubmit}>
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
