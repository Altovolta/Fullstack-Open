const Notification = ({notification}) => {
    if (!notification) return null

    const style = {
      borderStyle: 'solid',
      borderRadius: '2px',
      padding: '5px',
      marginBottom: '5px',
    }

    return (
        <div style={style}>
            {notification}
        </div>
    )
}

export default Notification