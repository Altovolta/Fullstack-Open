//import Blog from '../components/Blog'
import { useQuery } from '@tanstack/react-query'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { useRef } from 'react'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

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

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 3,
    border: 'solid',
    borderWidth: 3,
    marginBottom: 7,
    borderColor: 'black',
  }

  return (
    <div>
      {blogForm()}
      <br />
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} - {blog.author}{' '}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Home
