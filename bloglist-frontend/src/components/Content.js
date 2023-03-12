import { useRef } from 'react'
import BlogForm from './BlogForm'
import LogoutButton from "./LogoutButton"
import Togglable from './Togglable'
import Blog from "./Blog"
import PropTypes from 'prop-types'

const Content = ( {user, logoutServiceLogout, blogs } ) => {    
    const byLikes = (b1, b2) => b2.likes - b1.likes

    const blogsForSort = Array.from(blogs)

    const blogFormRef = useRef()
    const toggle = () => {
        blogFormRef.current.toggleVisibility()
    }
    
    const contentToShow =
        <div>
        <h2>Blogs</h2>
        {user.username} logged in <LogoutButton onClick={logoutServiceLogout}/>

        <Togglable buttonLabel="add blog" ref={blogFormRef}>
            <BlogForm toggle={toggle}/>
        </Togglable>

        {blogsForSort.sort(byLikes).map(blog => <Blog key={blog.id} blog={blog}/>)}
        </div>
    
    return contentToShow
}

export default Content

Content.propTypes = {
    user: PropTypes.object.isRequired,
    logoutServiceLogout: PropTypes.func.isRequired,
    blogs: PropTypes.array.isRequired,
}