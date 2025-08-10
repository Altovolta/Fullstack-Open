import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
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

  const [notification, setNotification] = useState({message: null, isError: false})

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

  const setNotificarionTimeout = () => {
    setTimeout(()=> {
      setNotification({message: null, isError:false})
    }, 5000)
  }

  const clearLogin = () => {
    setUsername('')
    setPassword('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const userResponse = await loginService.login({
        username, 
        password
      })

      window.localStorage.setItem('blogUser', JSON.stringify(userResponse))
      blogService.setToken(userResponse.token)
      setUser(userResponse)
      clearLogin()

    } catch(err) {
      setNotification({message: err.response.data.error, isError:true})
    }

    setNotificarionTimeout()
    
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogUser')
    setUser(null)
    blogService.setToken('')
  }

  const clearNewBlog = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title, 
        author, 
        url
      })

      setBlogs(blogs.concat(newBlog))
      setNotification({
        message: `A new blog '${newBlog.title}' by ${newBlog.author} added`, 
        isError:false
      })

      clearNewBlog()
      
    } catch(err) {
      setNotification({message: err.response.data.error, isError:true})
    }

    setNotificarionTimeout()
  }


  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm 
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in
        <button onClick={() => handleLogout()}>logout</button>
      </p>
      <h3>Create new</h3>
      <div>
        <BlogForm 
        handleNewBlog={handleNewBlog}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        />
      </div>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App