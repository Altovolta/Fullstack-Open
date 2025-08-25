import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import userService from '../services/users'
const Users = () => {
  const queryResult = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
  })

  if (queryResult.isLoading) {
    return null
  }

  const users = queryResult.data

  return (
    <div>
      <h2>Users</h2>
      <Table size="small" sx={{ width: '20%' }}>
        <TableHead sx={{ backgroundColor: '#dbe9a0' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              User
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Blogs created
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell sx={{ textAlign: 'center' }}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                {user.blogs.length}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Users
