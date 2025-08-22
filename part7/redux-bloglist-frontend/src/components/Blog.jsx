import { useState } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, currentUser }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

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

  const changeVisibility = () => {
    setVisible(!visible)
  }

  const onLike = async (blog) => {
    await dispatch(likeBlog(blog))
  }

  const onRemove = async (blog) => {
    const shouldDelete = window.confirm(
      `Remove blog '${blog.title}' by ${blog.author}`
    )

    if (shouldDelete) {
      await dispatch(removeBlog(blog))
    }
  }

  const blogDetails = () => {
    return (
      <>
        <a href="url">{blog.url}</a>
        <div data-testid="blogLikes">
          likes {blog.likes}
          <button onClick={() => onLike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div style={userIsOwner}>
          <button onClick={() => onRemove(blog)}>remove</button>
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
