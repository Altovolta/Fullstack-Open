import { useState } from 'react'

import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotification } from '../hooks/useNotification'
import blogService from '../services/blogs'

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const notifyWith = useNotification()
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      const message = `A new blog '${newBlog.title}' by ${newBlog.author} added`
      notifyWith({ message, isError: false })
    },
    onError: (err) => {
      const message = err.response.data.error
      notifyWith({ message, isError: true })
    },
  })

  const clearBlogForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    newBlogMutation.mutate({ title, author, url })
    clearBlogForm()
    toggleVisibility()
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
