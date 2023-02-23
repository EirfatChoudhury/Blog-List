import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    console.log("logging in")
    console.log(credentials)
    const response = await axios.post(baseUrl, credentials)
    console.log(`logged in as ${response.data.username}`)
    return response.data
}

export default { login }