import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#dbe9a0' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Blog</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Home
