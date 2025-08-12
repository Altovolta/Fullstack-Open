import { useState } from "react"


const Blog = ({ blog, onLike }) => {

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
      </>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author} {' '}
      <button onClick={changeVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible}>
        {blogDetails()}
      </div>
    </div>  
  )
}
  

export default Blog