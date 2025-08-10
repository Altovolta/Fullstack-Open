import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userItem = window.localStorage.getItem('blogUser')
    if(userItem) {
      const loggedUser = JSON.parse(userItem)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    const userResponse = await loginService.login({
      username, 
      password
    })

    window.localStorage.setItem('blogUser', JSON.stringify(userResponse))
    blogService.setToken(userResponse.token)
    setUser(userResponse)
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogUser')
    setUser(null)
    blogService.setToken('')
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = await blogService.create({
      title, 
      author, 
      url
    })

    setBlogs(blogs.concat(newBlog))

    setTitle('')
    setAuthor('')
    setUrl('')

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

  const blogForm = () => {

    return (
      <div>
        <form onSubmit={handleNewBlog}>
          <div>
            title  
            <input 
            type='text' 
            value={title} 
            onChange={({target}) => setTitle(target.value)}
            name='Title'/>
          </div>
          <div>
            author  
            <input 
            type='text' 
            value={author} 
            onChange={({target}) => setAuthor(target.value)}
            name='Author'/>
          </div>
          <div>
            url  
            <input 
            type='text' 
            value={url} 
            onChange={({target}) => setUrl(target.value)}
            name='Url'/>
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        {loginForm()}
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
      <h3>Create new</h3>
      <div>
        {blogForm()}
      </div>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App