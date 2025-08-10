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

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogUser')
    if(loggedUser) {
      setUser(JSON.parse(loggedUser))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    const user = await loginService.login({
      username, 
      password
    })

    window.localStorage.setItem('blogUser', JSON.stringify(user))

    setUser(user)
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogUser')
    setUser(null)
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
        <button onClick={() => handleLogout()}>logout</button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App