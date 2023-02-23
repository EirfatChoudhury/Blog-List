import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("Sending new blog:", newObject)
  const response = await axios.post(baseUrl, newObject, config)
  console.log("Returning new blog:", response.data)
  return response.data
}

const update = async (newObject, id) => {
  console.log("Updating blog to", newObject)
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  console.log("Returning", newObject)
  return response.data
}

const del = async (id) => {
  console.log("Sending blog to delete...")
  await axios.delete(`${baseUrl}/${id}`)
  return console.log("Deleting data")
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, create, update, del }