import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    console.log("Sending axios request to log in with credentials:", credentials)
    const response = await axios.post(baseUrl, credentials)
    console.log("Returning log in request response data:", response.data)
    return response.data
}

export default { login }