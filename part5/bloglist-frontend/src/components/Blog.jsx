import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLike, removeBlog }) => {

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 3,
    border: 'solid',
    borderWidth: 3,
    marginBottom: 7,
    borderColor: '#4000ff'
  }

  const changeVisibility = () => {
    setVisible(!visible)
  }

  const blogDetails = () => {
    return(
      <>
        <a href="url">{blog.url}</a>
        <div>
          likes {blog.likes}
          <button onClick={() => onLike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          <button onClick={() => removeBlog(blog)}>remove</button>
        </div>
      </>
    )
  }

  return (
    <div style={blogStyle} className='blogDiv'>
      {blog.title} - {blog.author} {' '}
      <button onClick={changeVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible} className='blogDetails'>
        {blogDetails()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  onLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })
  })
}

export default Blog