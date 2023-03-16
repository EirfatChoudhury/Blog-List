import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
    console.log("Sending axios request to get all users")
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = ( userToBeCreated ) => {
    console.log("Sending axios request to create new user with info:", userToBeCreated)
    const request = axios.post(baseUrl, userToBeCreated)
    return request.then(response => response.data)
}

export default { getAll, create }