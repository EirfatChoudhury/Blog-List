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
    try {
        const config = {
            headers: { Authorization: token },
        }
        console.log("Sending axios request to create blog with properties:", object)
        const result = await axios.post(baseUrl + "/blogs", object, config).then(response => response.data)
        console.log("Result of axios request to retrieve data on blogs:", result)
        return result
    }
    catch (exception) {
        console.log('Failed to create blog post')
        console.log(exception)
    }
}

export const likeBlog = async ( object ) => {
    try {
        console.log("Sending axios request to update likes on blog:", object)
        const result = await axios.put(baseUrl + "/blogs/" + object.id, object).then(response => response.data)
        console.log("Result of axios request to update likes on blog:", result)
        return result
    }
    catch (exception) {
        console.log('Failed to update blog post')
        console.log(exception)
    }
}

export const delBlog = async ( id ) => {
    try {
        const config = {
            headers: { Authorization: token },
        }
        console.log("Sending axios request to delete blog with id:", id)
        await axios.delete(baseUrl + "/blogs/" + id, config)
        console.log("Blog deleted")
    }
    catch (exception) {
        console.log("Failed to delete blog")
        console.log(exception)
    }
}