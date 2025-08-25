import { AppBar, Button, IconButton, Toolbar } from '@mui/material'
import { useUser } from '../hooks/useUser'
import { Link } from 'react-router-dom'

const Header = () => {
  const user = useUser()
  if (user.currentUser === null) return null

  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: '#395d62' }}>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Button
          color="inherit"
          sx={{ fontWeight: 'bold' }}
          component={Link}
          to="/"
        >
          Blogs
        </Button>
        <Button
          color="inherit"
          sx={{ fontWeight: 'bold' }}
          component={Link}
          to="/users"
        >
          Users
        </Button>

        <Button
          onClick={user.logOut}
          color="inherit"
          sx={{ marginLeft: 'auto', fontWeight: 'bold' }}
        >
          logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
