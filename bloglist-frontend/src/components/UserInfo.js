import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserInfo = () => {
    const id = useParams().id
    const users = useSelector(state => state.users)
    const user = users.find(user => user.id === id)
    if (!user) {
        return (
            <div>Loading data...</div>
        )
    }

    return (
        <div>
            <h2>User: {user.username}</h2>

            <h4>Added blogs</h4>
            {user.blogs.length >= 1 ? user.blogs.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>) : <div>No blogs Added</div>}
        </div>
    )
}

export default UserInfo