import { useRef } from 'react'
import { useQuery } from 'react-query'
import { getBlogs } from '../requests'
import logoutService from '../services/logout'
import BlogForm from './BlogForm'
import LogoutButton from "./LogoutButton"
import Togglable from './Togglable'
import Blog from "./Blog"
import { useUserValue } from '../contexts/UserContext'

const Content = () => {    
    const result = useQuery('blogs', getBlogs, {retry: false, refetchOnWindowFocus: false})
    console.log("My useQuery result:", result)
    let blogs = []
    if (result.data !== undefined) {
        blogs = result.data
        console.log("Blogs:", blogs)
    }
    const user = useUserValue()

    const byLikes = (b1, b2) => b2.likes - b1.likes
    const blogsToSort = blogs

    const blogFormRef = useRef()
    const toggle = () => {blogFormRef.current.toggleVisibility()}
    
    const contentToShow =
        <div>
        <h2>Blogs</h2>
        {user.username} logged in <LogoutButton onClick={logoutService.logout}/>

        <Togglable buttonLabel="add blog" ref={blogFormRef}>
            <BlogForm toggle={toggle}/>
        </Togglable>

        {blogsToSort.sort(byLikes).map(blog => <Blog key={blog.id} blog={blog}/>)}
        </div>
    
    return contentToShow
}

export default Content