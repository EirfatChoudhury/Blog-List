import BlogForm from './BlogForm'
import LogoutButton from "./LogoutButton"
import Togglable from './Togglable'
import Blog from "./Blog"
import PropTypes from 'prop-types'

const Content = ( {user, logoutServiceLogout, addBlog, blogs, blogFormRef, increaseLikes, deleteBlog} ) => {    
    const byLikes = (b1, b2) => b2.likes - b1.likes
    
    const contentToShow =
        <div>
        <h2>Blogs</h2>
        {user.username} logged in <LogoutButton onClick={logoutServiceLogout}/>

        <Togglable buttonLabel="add blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
        </Togglable>

        {blogs.sort(byLikes).map(blog => <Blog key={blog.id} blog={blog} user={user} addLike={increaseLikes} deleteThisBlog={deleteBlog}/>)}
        </div>
    
    return contentToShow
}

export default Content

Content.propTypes = {
    user: PropTypes.object.isRequired,
    logoutServiceLogout: PropTypes.func.isRequired,
    addBlog: PropTypes.func.isRequired,
    blogs: PropTypes.array.isRequired,
    blogFormRef: PropTypes.object.isRequired,
    increaseLikes: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
}