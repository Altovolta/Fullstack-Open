const Notification = ({notification}) => {

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
        <div style={style}>
            {notification.message}
        </div>
    )
}

export default Notification