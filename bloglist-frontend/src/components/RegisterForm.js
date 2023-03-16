import { useDispatch } from "react-redux"
import { useField } from "../hooks"
import { Form, Button } from 'react-bootstrap'
import { changeNotification } from "../reducers/notificationReducer"
import { errorStyle } from "../reducers/notificationStyleReducer"
import { useSelector } from 'react-redux'
import { registerUser } from "../reducers/usersReducer"
import { useNavigate } from 'react-router-dom'
import { logIn } from "../reducers/userReducer"

const RegisterForm = () => {
    const name = useField('text')
    const username = useField('text')
    const password = useField('password')
    const confirmPassword = useField('password')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const users = useSelector(state => state.users)

    const register = async (event) => {
        event.preventDefault()
        if (password.inputProperties.value !== confirmPassword.inputProperties.value) {
            dispatch(changeNotification("Passwords do not match"))
            dispatch(errorStyle())
            name.reset()
            username.reset()
            password.reset()
            confirmPassword.reset()
            return null
        }
        else if (users.find(user => user.username === username.inputProperties.value)) {
            dispatch(changeNotification("Username unavailable"))
            dispatch(errorStyle())
            name.reset()
            username.reset()
            password.reset()
            confirmPassword.reset()
            return null
        }

        const userToBeCreated = {
            name: name.inputProperties.value,
            username: username.inputProperties.value,
            password: password.inputProperties.value
        }

        await dispatch(registerUser(userToBeCreated))
        name.reset()
        username.reset()
        password.reset()
        confirmPassword.reset()
        await dispatch(logIn({ username: username.inputProperties.value, password: password.inputProperties.value }))
        navigate('/blogs')
    }

    const showHide = () => {
        const passwords = document.getElementsByClassName("password")

        for (let i = 0 ; i < passwords.length; i++) {
            if (passwords[i].type === "password") {
                passwords[i].type = "text"
            } else {
                passwords[i].type = "password"
            }
        }
    }

    const margin = {
        marginTop: 20
    }

    return (
        <div>
            <div>
                <h3>Register to application</h3>
                <div>
                    <Form onSubmit={register}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control {...name.inputProperties} />

                            <Form.Label>Username</Form.Label>
                            <Form.Control {...username.inputProperties} />

                            <Form.Label>Password</Form.Label>
                            <Form.Control className="password" {...password.inputProperties} />

                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control className="password" {...confirmPassword.inputProperties} />

                            <Form.Check type="checkbox" label="Show password" onClick={showHide}/>

                            <Button style={margin} variant="primary" type="submit">Sign up</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm