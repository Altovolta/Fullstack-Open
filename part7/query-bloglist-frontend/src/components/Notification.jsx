import { useContext } from 'react'
import NotificationContext from '../contexts/notificationContext'

const Notification = () => {
  const [notification] = useContext(NotificationContext)

  if (notification.message === null) return null

  const color = notification.isError ? 'red' : 'green'
  const style = {
    color: color,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '2px',
    padding: '10px',
    marginBottom: '10px',
    fontWeight: 'bold',
  }

  return (
    <div style={style} className="notification">
      {notification.message}
    </div>
  )
}

export default Notification
