import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
const User = () => {
  const userId = useParams().id

  const queryResult = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
  })

  if (queryResult.isLoading) return null

  const users = queryResult.data
  if (!users) return null

  const user = users.find((user) => user.id === userId)

  if (!user) return <h2>User not found</h2>

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
