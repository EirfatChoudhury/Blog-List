import logoutServive from '../services/logout'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const LogoutButton = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        logoutServive.logout()
        navigate("/login")
    }

    return(
    <Button onClick={handleLogout}> Logout </Button>
    )
}

export default LogoutButton