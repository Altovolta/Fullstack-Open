import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

import { List, ListItem, Typography } from '@mui/material'
const User = () => {
  const userId = useParams().id

  const queryResult = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
  })

  if (queryResult.isLoading || !queryResult.data) return null

  const user = queryResult.data.find((user) => user.id === userId)

  if (!user) return <h2>User not found</h2>

  return (
    <div>
      <Typography variant="h4" sx={{ marginTop: 1, marginBottom: 1 }}>
        {user.name}
      </Typography>
      <Typography variant="h5">Blogs</Typography>
      <List dense>
        {user.blogs.map((blog) => (
          <ListItem
            key={blog.id}
            sx={{
              marginBottom: '3px',
              backgroundColor: '#d1c8f1',
            }}
          >
            {blog.title}
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default User
