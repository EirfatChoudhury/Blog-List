import logoutServive from '../services/logout'

const LogoutButton = () => (
    <button onClick={logoutServive.logout}> Logout </button>
)

export default LogoutButton