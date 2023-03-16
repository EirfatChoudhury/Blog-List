import { logIn } from "../reducers/userReducer"
import { useDispatch } from "react-redux"
import Togglable from "./Togglable"
import { useField } from "../hooks"

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

    return (
    <Togglable buttonLabel="login">
        <div>
            <h2>Log in to application</h2>
            <div>
                <form onSubmit={login}>
                    <div>
                        username: <input id="username" {...username.inputProperties}></input>
                    </div>
                    <div>
                        password: <input id="password" {...password.inputProperties}></input>
                    </div>
                    <button id="login-button" type="submit">login</button>
                </form>
            </div>
        </div>
    </Togglable>
    )
}

export default LoginForm