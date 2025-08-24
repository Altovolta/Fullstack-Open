import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import blogService from '../services/blogs'

import { useUser } from '../hooks/useUser'
import { useBlogMutations } from '../hooks/useBlogMutations'
import CommentForm from '../components/CommentForm'

const Blog = () => {
  const blogId = useParams().id
  const { currentUser } = useUser()
  const { likeBlogMutation, removeBlogMutation } = useBlogMutations()

  const onLike = () => {
    likeBlogMutation.mutate({ ...blogInfo, likes: blogInfo.likes + 1 })
  }

  const removeBlog = () => {
    const shouldDelete = window.confirm(
      `Remove blog '${blogInfo.title}' by ${blogInfo.author}`
    )

    if (shouldDelete) {
      removeBlogMutation.mutate({ id: blogInfo.id })
    }
  }

  const queryResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    select: (data) => data.sort((a, b) => b.likes - a.likes),
  })

  if (queryResult.isLoading || !queryResult.data) return null

  const blogInfo = queryResult.data.find((blog) => blog.id === blogId)

  if (!blogInfo) return <h2>Blog not found</h2>

  const userIsOwner = {
    display: blogInfo.user.username === currentUser.username ? '' : 'none',
  }

  return (
    <div>
      <h2>
        {blogInfo.title} - {blogInfo.author}
      </h2>
      <a href="url">{blogInfo.url}</a>
      <div data-testid="blogLikes">
        likes {blogInfo.likes}
        <button onClick={onLike}>like</button>
      </div>
      <div>{blogInfo.user.name}</div>
      <div style={userIsOwner}>
        <button onClick={removeBlog}>remove</button>
      </div>
      <h2> Comments</h2>
      <CommentForm blogId={blogInfo.id} />
      <ul>
        {blogInfo.comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
