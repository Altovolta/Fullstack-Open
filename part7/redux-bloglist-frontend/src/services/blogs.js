import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const create = ({ title, author, url }) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, { title, author, url }, config)
  return request.then((response) => response.data)
}

const remove = ({ id }) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

const update = ({ id, user, likes, author, title, url }) => {
  const request = axios.put(`${baseUrl}/${id}`, {
    user: user.id,
    likes,
    author,
    title,
    url,
  })

  return request.then((response) => response.data)
}

export default { getAll, setToken, create, update, remove }
