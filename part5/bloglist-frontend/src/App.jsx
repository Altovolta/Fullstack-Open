import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    const user = await loginService.login({
      username, 
      password
    })

    console.log(user)
    
    setUser(user)
    setUsername('')
    setPassword('')
  }

  const loginForm = () => {
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

  if (user === null) {
    return (
      <div>
        {user === null && loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App