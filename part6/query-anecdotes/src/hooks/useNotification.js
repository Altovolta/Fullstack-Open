import { useContext } from 'react'
import NotificiationContext from '../NotificationContext'

export const useNotificationValue = () => {
  return useContext(NotificiationContext)[0]
}

export const useNotificationDispatch = () => {
  return useContext(NotificiationContext)[1]
}