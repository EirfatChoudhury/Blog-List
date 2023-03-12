import axios from 'axios'

const baseUrl = 'http://localhost:3003/api'

let token = null
export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getBlogs = async () => {
    console.log("Sending axios request to retrieve data on blogs")
    const result = await axios.get(baseUrl + "/blogs").then(response => response.data)
    console.log("Result of axios request to retrieve data on blogs:", result)
    return result
}

export const createBlog = async ( object ) => {
    const config = {
        headers: { Authorization: token },
    }
    console.log("Sending axios request to create blog with properties:", object)
    const result = await axios.post(baseUrl + "/blogs", object, config).then(response => response.data)
    console.log("Result of axios request to retrieve data on blogs:", result)
    return result
}

export const likeBlog = async ( object ) => {
    console.log("Sending axios request to update likes on blog:", object)
    const result = await axios.put(baseUrl + "/blogs/" + object.id, object).then(response => response.data)
    console.log("Result of axios request to update likes on blog:", result)
    return result
}

export const delBlog = async ( id ) => {
    console.log("Sending axios request to delete blog with id:", id)
    await axios.delete(baseUrl + "/blogs/" + id)
    console.log("Blog deleted")
}