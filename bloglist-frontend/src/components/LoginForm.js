import { logIn } from "../reducers/userReducer"
import { useDispatch } from "react-redux"
import Togglable from "./Togglable"
import { useField } from "../hooks"
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
    const username = useField('text')
    const password = useField('text')
    const dispatch = useDispatch()

    const login = (event) => {
        event.preventDefault()
        dispatch(logIn({ username: username.inputProperties.value, password: password.inputProperties.value }))
        username.reset()
        password.reset()
    }

    const margin = {
        marginTop: 20
    }

    return (
        <div>
            <Togglable buttonLabel='Login'>
                <div>
                    <h2>Log in to application</h2>
                    <div>
                        <Form onSubmit={login}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control {...username.inputProperties} />

                                <Form.Label>Password</Form.Label>
                                <Form.Control {...password.inputProperties} />

                                <Button style={margin} variant="primary" type="submit">Login</Button>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </Togglable>
        </div>
    )
}

export default LoginForm