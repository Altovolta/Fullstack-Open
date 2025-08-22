import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearBlogForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const onSubmit = async (event) => {
    // TODO: inprove error handling. Add toggle when created
    event.preventDefault()
    try {
      dispatch(createBlog({ title, author, url }))
      clearBlogForm()

      dispatch(
        setNotification(
          {
            message: `A new blog '${title}' by ${author} added`,
            isError: false,
          },
          5000
        )
      )
    } catch (err) {
      dispatch(
        setNotification(
          { message: err.response.data.error, isError: true },
          5000
        )
      )
    }
  }

  return (
    <div className="blogForm">
      <h3>Create new</h3>
      <form onSubmit={onSubmit}>
        <div>
          title:{' '}
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            name="Title"
            id="title-input"
            data-testid="titleInput"
          />
        </div>
        <div>
          author:{' '}
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            name="Author"
            id="author-input"
            data-testid="authorInput"
          />
        </div>
        <div>
          url:{' '}
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            name="Url"
            id="url-input"
            data-testid="urlInput"
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
