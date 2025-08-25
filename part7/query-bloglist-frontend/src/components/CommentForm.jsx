import { useState } from 'react'
import { useBlogMutations } from '../hooks/useBlogMutations'
import { Button, TextField } from '@mui/material'

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('')
  const { commentBlogMutation } = useBlogMutations()

  const commentBlog = (event) => {
    event.preventDefault()
    commentBlogMutation.mutate({ id: blogId, comment })
    setComment('')
  }

  return (
    <form onSubmit={commentBlog}>
      <TextField
        label="comment"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        sx={{}}
      />
      <Button
        color="inherit"
        sx={{
          backgroundColor: '#92dcec',
          marginLeft: '5px',
          marginTop: '7px',
          fontWeight: 'bold',
        }}
        type="submit"
      >
        add comment
      </Button>
    </form>
  )
}

export default CommentForm
