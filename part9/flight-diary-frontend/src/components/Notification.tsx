import type { JSX } from "react";

interface NotificationProps {
  message: string
}

const Notification = (props: NotificationProps): null | JSX.Element => {
  if (!props.message) { return null }
  return (
    <>
      <br/>
      <div style={{ color: 'red' }}>
        {props.message}
      </div>
    </>
  )
}

export default Notification