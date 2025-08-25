import { useContext } from 'react'
import NotificationContext from '../contexts/notificationContext'
import { Alert } from '@mui/material'

const Notification = () => {
  const [notification] = useContext(NotificationContext)

  if (notification.message === null) return null

  const severity = notification.isError ? 'error' : 'success'

  return (
    <div className="notification">
      <Alert severity={severity}>{notification.message}</Alert>
    </div>
  )
}

export default Notification
