import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { logOut } from '../reducers/userReducer'

const LogoutButton = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logOut())
        navigate("/login")
    }

    return(
    <Button onClick={handleLogout}> Logout </Button>
    )
}

export default LogoutButton