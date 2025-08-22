import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
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

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string,
    isError: PropTypes.bool.isRequired,
  }),
}

export default Notification
