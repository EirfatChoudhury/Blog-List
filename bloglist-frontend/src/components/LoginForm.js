import { logIn } from "../reducers/userReducer"
import { useDispatch } from "react-redux"
import Togglable from "./Togglable"
import { useField } from "../hooks"
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
    const username = useField('text')
    const password = useField('password')
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



    return (
        <div>
            <Togglable buttonLabel='Login'>
                <div>
                    <h3>Log in to application</h3>
                    <div>
                        <Form onSubmit={login}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control {...username.inputProperties} />

                                <Form.Label>Password</Form.Label>
                                <Form.Control className="password" {...password.inputProperties} />

                                <Button style={margin} variant="primary" type="submit">Login</Button>

                                <Form.Check type="checkbox" label="Show password" onClick={showHide}/>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </Togglable>
        </div>
    )
}

export default LoginForm