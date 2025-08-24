import Blog from '../components/Blog'
import { useQueryClient } from '@tanstack/react-query'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { useRef } from 'react'

const Home = () => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])
  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>
    )
  }

  return (
    <div>
      {blogForm()}
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Home
