import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Content = () => {
    const blogs = useSelector(state => state.blogs)

    const byLikes = (b1, b2) => b2.likes - b1.likes

    const blogsForSort = Array.from(blogs)

    const blogFormRef = useRef()
    const toggle = () => {
        blogFormRef.current.toggleVisibility()
    }
    
    return (
        <div>
        <h2>Blogs</h2>
        <Togglable buttonLabel="add blog" ref={blogFormRef}>
            <BlogForm toggle={toggle}/>
        </Togglable>

        {blogsForSort.sort(byLikes).map(blog => <p key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link></p>)}
        </div>
    )
}

export default Content