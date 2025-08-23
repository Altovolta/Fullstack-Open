import { useContext } from 'react'
import NotificationContext from '../contexts/notificationContext'

export const useNotification = () => {
  const [notif, notifDispatcher] = useContext(NotificationContext)

  return ({ message, isError }) => {
    notifDispatcher({ type: 'CREATE', payload: { message, isError } })

    setTimeout(() => {
      notifDispatcher({ type: 'CLEAR' })
    }, 5000)
  }
}
