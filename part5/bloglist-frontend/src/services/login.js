import axios from 'axios'

const baseURL = '/api/login'
const login = ({username, password}) => {
    const request = axios.post(baseURL, {username, password})
    return request.then(response => response.data)
}

export default {login}