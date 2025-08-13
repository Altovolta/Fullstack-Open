import { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({
  onNewBlog,
}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearBlogForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    await onNewBlog({ title, author, url })
    clearBlogForm()
  }

  return (
    <div className='blogForm'>
      <h3>Create new</h3>
      <form onSubmit={onSubmit}>
        <div>
          title: {' '}
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            name='Title'
            id='title-input'
          />
        </div>
        <div>
          author:{' '}
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            name='Author'
            id='author-input'
          />
        </div>
        <div>
          url: {' '}
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            name='Url'
            id='url-input'
          />
        </div>
        <div>
          <button type='submit'>create</button>
        </div>

      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onNewBlog: PropTypes.func.isRequired,
}

export default BlogForm