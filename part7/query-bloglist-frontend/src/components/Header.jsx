import { useUser } from '../hooks/useUser'
import { Link } from 'react-router-dom'

const Header = () => {
  const user = useUser()
  if (user.currentUser === null) return null

  const headerStyle = {
    backgroundColor: 'lightgrey',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 3,
    marginBottom: 7,
  }

  return (
    <div style={headerStyle}>
      <Link to={'/'}>Blogs</Link> <Link to={'/users'}>Users</Link>{' '}
      {user.currentUser.name} logged in{' '}
      <button onClick={user.logOut}>logout</button>
    </div>
  )
}

export default Header
