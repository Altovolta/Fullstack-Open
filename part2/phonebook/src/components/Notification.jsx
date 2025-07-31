const Notification = ({message}) => {

    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '2px',
        padding: '10px',
        marginBottom: '10px',
        fontWeight: 'bold',
    }

    if (message === null) return null 

    return (
        <div style={successStyle}>
            {message}
        </div>
    )
}

export default Notification