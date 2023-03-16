import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  console.log("Sending request to set token")
  token = `Bearer ${newToken}`
  console.log("Token:", token)
}

const getAll = () => {
  console.log("Sending axios request to get all blogs")
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("Sending axios request for creation of blog:", newObject)
  const response = await axios.post(baseUrl, newObject, config)
  console.log("Returning new blog axios response:", response.data)
  return response.data
}

const update = async (newObject, id) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("Sending axios request to update blog", newObject)
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  console.log("Returning updated blog axios response", response.data)
  return response.data
}

const del = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("Sending axios request to delete blog")
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { setToken, getAll, create, update, del }