export const createNotification = (dispatch, message, timeout = 5000) => {
    dispatch({
    type:"NEW", payload: `${message}`
    })
    setTimeout(() => dispatch({type:"REMOVE"}), timeout)
}

