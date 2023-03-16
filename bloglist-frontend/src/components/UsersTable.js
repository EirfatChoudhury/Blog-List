import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UsersTable = () => {
    const users = useSelector(state => state.users)

    return (
        <div>
            <h3>Users</h3>
            <Table striped>
                <tbody>
                    <tr key={'users-number-header'}>
                        <th>
                            Users
                        </th>
                        <th>
                            Number of blogs
                        </th>
                    </tr>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td className='align-middle'>
                                <Link to={`/users/${user.id}`}>{user.username}</Link>
                            </td>
                            <td className='align-middle'>
                                {user.blogs.length}
                            </td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    )
}

export default UsersTable