import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersTable = () => {
    const users = useSelector(state => state.users)

    return (
        <div>
            <h2>Users</h2>

            {users.map(user => <p><Link to={`/users/${user.id}`}>{user.username}</Link> : {user.blogs.length}</p>)}
        </div>
    )
}

export default UsersTable