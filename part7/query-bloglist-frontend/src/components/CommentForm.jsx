import { useState } from 'react'
import { useBlogMutations } from '../hooks/useBlogMutations'

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
      <input
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm
