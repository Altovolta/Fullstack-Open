import { createContext, useReducer } from "react";


const notificationReducer = (state, action) => {
  switch(action.type) {
    case "NEW": 
      return action.payload
    case "REMOVE":
      return ''
    default: return state
  }
}

const NotificiationContext = createContext()

export const NotificiationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificiationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificiationContext.Provider>
  )
}


export default NotificiationContext