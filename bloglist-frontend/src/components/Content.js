import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Table } from 'react-bootstrap'

const Content = () => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    const margin = {
        marginTop: 20
    }

    if (!blogs) {
        return(
            <div style={margin}>
                Loading data...
            </div>
        )
    } 

    const byLikes = (b1, b2) => b2.likes - b1.likes

    const blogsForSort = Array.from(blogs)

    const blogFormRef = useRef()
    const toggle = () => {
        blogFormRef.current.toggleVisibility()
    }
    
    return (
        <div style={margin}>
            <div>
                {!user ? 
                <div> 
                    <p style={margin}>Log in to add Blogs</p>
                    <h3>Blogs</h3>
                </div> : 
                <div>
                    <h3>Blogs</h3>
                    <Togglable buttonLabel="Add blog" ref={blogFormRef}>
                        <BlogForm toggle={toggle}/>
                    </Togglable>
                </div>}
            </div>
            
            <div style={margin}>
                <Table striped>
                    <tbody>
                        <tr key={'title-author-header'}>
                            <th>
                                Title
                            </th>
                            <th>
                                Author
                            </th>
                        </tr>
                        {blogsForSort.sort(byLikes).map(blog =>
                        <tr key={blog.id}>
                            <td className='align-middle'>
                                <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
                            </td>
                            <td className='align-middle'>
                                {blog.author}
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Content