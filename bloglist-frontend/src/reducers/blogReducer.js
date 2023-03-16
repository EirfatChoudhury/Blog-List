import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { changeNotification } from "./notificationReducer"
import { successStyle, errorStyle } from './notificationStyleReducer'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        getBlogs(state, action) {
            console.log("All blogs returned to state:", action.payload)
            return action.payload
        },
        appendBlog(state, action) {
            console.log("Appending blog to state:", action.payload)
            state.push(action.payload)
        },
        removeBlog(state, action) {
            console.log("Deleting blog from state:", state.pop(state.find(blog => blog.id === action.payload)))
            return state
        },
        updateBlog(state, action) {
            console.log("Updating state of blog:", action.payload)
            return state.map(blog => blog.id !== action.payload.id ? blog : action.payload)
        }
    }
})

export const { getBlogs, appendBlog, removeBlog, updateBlog } = blogSlice.actions

export const initialiseBlogs = () => {
    return async dispatch => {
        console.log("Initialising blogs")
        const blogs = await blogService.getAll()
        dispatch(getBlogs(blogs))
    }
}

export const addThisBlog =  (content) => {
    return async dispatch => {
        try {
            console.log("Sending blog:", content)
            const newBlog = await blogService.create(content)
            console.log("Returned blog:", newBlog)
            dispatch(appendBlog(newBlog))
            console.log("Blog appended to state:", newBlog)
            dispatch(changeNotification(`Successfully added ${newBlog.title} to Bloglist`))
            dispatch(successStyle())
        }
        catch (exception) {
            console.log('Failed to create blog post')
            console.log(exception)
            dispatch(changeNotification(`Failed to add ${content.title} to Bloglist`))
            dispatch(errorStyle())
        }
    }
}

export const deleteThisBlog = ( id ) => {
    return async dispatch => {
        try {
            console.log("Blog with id sending for deletion:", id)
            await blogService.del(id)
            console.log("Blog with id deleted:", id)
            dispatch(removeBlog(id))
            console.log("Blog with id removed from state:", id)
        }
        catch (exception) {
            console.log("Failed to delete blog")
            console.log(exception)
        }
    }
}

export const likeThisBlog = ( content, id ) => {
    return async dispatch => {
        try {
            console.log("Sending blog to update like by one:", content)
            const updatedBlog = await blogService.update(content, id)
            console.log("Returned blog with like updated:", updatedBlog)
            dispatch(updateBlog(updatedBlog))
            console.log("Updated blog state to increase like on blog:", updatedBlog)
        }
        catch (exception) {
            console.log('Failed to update blog post')
            console.log(exception)
        }
    }
}

export const commentOnThisBlog = ( content, id ) => {
    return async dispatch => {
        try {
            console.log("Sending blog to update with comment:", content)
            const updatedBlog = await blogService.update(content, id)
            console.log("Returned blog with comment updated:", updatedBlog)
            dispatch(updateBlog(updatedBlog))
            console.log("Updated blog state to include new comment:", updatedBlog.comments)
        }
        catch (exception) {
            console.log("Failed to update blog post")
            console.log(exception)
        }
    }
}

export default blogSlice.reducer