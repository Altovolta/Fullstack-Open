import { useState } from 'react'

import { Button, TextField, Typography } from '@mui/material'
import { useBlogMutations } from '../hooks/useBlogMutations'

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const { newBlogMutation } = useBlogMutations()

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
      <Typography
        variant="h4"
        sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
      >
        Create new
      </Typography>
      <form onSubmit={onSubmit}>
        <div>
          <TextField
            label="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            name="Title"
            id="title-input"
            data-testid="titleInput"
            sx={{ marginTop: '5px' }}
          />
        </div>
        <div>
          <TextField
            label="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            name="Author"
            id="author-input"
            data-testid="authorInput"
            sx={{ marginTop: '5px' }}
          />
        </div>
        <div>
          <TextField
            label="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            name="Url"
            id="url-input"
            data-testid="urlInput"
            sx={{ marginTop: '5px' }}
          />
        </div>
        <div>
          <Button
            color="inherit"
            sx={{
              backgroundColor: '#92dcec',
              marginTop: '5px',
              marginRight: '5px',
            }}
            type="submit"
          >
            create
          </Button>
          <Button
            onClick={toggleVisibility}
            color="inherit"
            sx={{ backgroundColor: '#92dcec', marginTop: '5px' }}
          >
            cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
