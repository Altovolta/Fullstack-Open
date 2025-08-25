import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

import blogService from '../services/blogs'

import { useUser } from '../hooks/useUser'
import { useBlogMutations } from '../hooks/useBlogMutations'
import CommentForm from '../components/CommentForm'
import { Button, List, ListItem, Typography } from '@mui/material'

const Blog = () => {
  const blogId = useParams().id
  const { currentUser } = useUser()
  const navigate = useNavigate()
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
      navigate('/')
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

  const userIsOwner = blogInfo.user.username === currentUser.username

  return (
    <div>
      <Typography
        variant="h4"
        sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
      >
        {blogInfo.title} - {blogInfo.author}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        url: <a href={blogInfo.url}>{blogInfo.url}</a>
      </Typography>

      <Typography
        variant="body1"
        data-testid="blogLikes"
        sx={{ marginBottom: 1 }}
      >
        likes: {blogInfo.likes}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        uploaded by {blogInfo.user.name}
      </Typography>
      <Button
        color="inherit"
        sx={{
          backgroundColor: '#92dcec',
          marginRight: '5px',
          fontWeight: 'bold',
        }}
        onClick={onLike}
      >
        like
      </Button>
      {userIsOwner && (
        <Button
          color="inherit"
          sx={{
            backgroundColor: '#92dcec',
            fontWeight: 'bold',
          }}
          onClick={removeBlog}
        >
          remove
        </Button>
      )}

      <Typography
        variant="h5"
        sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold' }}
      >
        Comments
      </Typography>
      <CommentForm blogId={blogInfo.id} />
      <List dense>
        {blogInfo.comments.map((comment) => (
          <ListItem
            key={comment.id}
            sx={{
              marginBottom: '3px',
              backgroundColor: '#d1c8f1',
            }}
          >
            {comment.text}
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Blog
