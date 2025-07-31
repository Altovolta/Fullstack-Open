const Notification = ({message, isError}) => {

    if (message === null) return null 

    const color = isError ? 'red' : 'green'

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
            {message}
        </div>
    )
}

export default Notification