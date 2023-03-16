import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

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

            <Table striped>
                <tbody>
                    <tr key={'added-blogs-header'}>
                        <th>
                            Added Blogs
                        </th>
                    </tr>
                    {user.blogs.length >= 1 ? 
                    user.blogs.map(blog => 
                    <tr key={blog.id}>
                        <td className='align-middle'>
                            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </td>
                    </tr>) : 
                    <tr key={'no-blogs'}>
                        <td className='align-middle'>
                            No Blogs Added
                        </td>
                    </tr>}
                </tbody>
            </Table>
        </div>
    )
}

export default UserInfo