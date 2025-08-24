import Blog from '../components/Blog'
import { useQuery } from '@tanstack/react-query'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { useRef } from 'react'
import blogService from '../services/blogs'

const Home = () => {
  const queryResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    select: (data) => data.sort((a, b) => b.likes - a.likes),
  })
  const blogFormRef = useRef()

  if (queryResult.isLoading) {
    return null
  }

  const blogs = queryResult.data

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
