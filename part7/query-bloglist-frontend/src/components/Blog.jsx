import { useState } from 'react'
import PropTypes from 'prop-types'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotification } from '../hooks/useNotification'
import blogService from '../services/blogs'
import { useUser } from '../hooks/useUser'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const { currentUser } = useUser()

  const showWhenVisible = { display: visible ? '' : 'none' }
  const userIsOwner = {
    display: blog.user.username === currentUser.username ? '' : 'none',
  }

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 3,
    border: 'solid',
    borderWidth: 3,
    marginBottom: 7,
    borderColor: '#4000ff',
  }

  const notifyWith = useNotification()
  const queryClient = useQueryClient()

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
      updatedBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
      queryClient.setQueryData(['blogs'], updatedBlogs)
      notifyWith({ message: 'Te gusto esa eh...', isError: false })
    },
    onError: (err) => {
      const message = err.response.data.error
      notifyWith({ message, isError: true })
    },
  })

  const onLike = () => {
    likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(['blogs'])
      const filteredBlogs = blogs.filter((b) => b.id !== blog.id)

      queryClient.setQueryData(['blogs'], filteredBlogs)

      const message = `Blog '${blog.title}' deleted`
      notifyWith({ message, isError: false })
    },
    onError: (err) => {
      const message = err.response.data.error
      notifyWith({ message, isError: true })
    },
  })

  const removeBlog = () => {
    const shouldDelete = window.confirm(
      `Remove blog '${blog.title}' by ${blog.author}`
    )

    if (shouldDelete) {
      removeBlogMutation.mutate({ id: blog.id })
    }
  }

  const changeVisibility = () => {
    setVisible(!visible)
  }

  const blogDetails = () => {
    return (
      <>
        <a href="url">{blog.url}</a>
        <div data-testid="blogLikes">
          likes {blog.likes}
          <button onClick={onLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div style={userIsOwner}>
          <button onClick={removeBlog}>remove</button>
        </div>
      </>
    )
  }

  return (
    <div style={blogStyle} className="blogDiv">
      {blog.title} - {blog.author}{' '}
      <button onClick={changeVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} className="blogDetails">
        {blogDetails()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }),
}

export default Blog
