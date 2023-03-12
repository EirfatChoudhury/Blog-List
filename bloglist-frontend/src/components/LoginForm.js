import { useState } from "react"
import PropTypes from 'prop-types'
import { logIn } from "../reducers/userReducer"
import { useDispatch } from "react-redux"

const LoginForm = () => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const login = (event) => {
        event.preventDefault()
        dispatch(logIn({username, password}))
        setUsername(null)
        setPassword(null)
        document.getElementById('username').value = null
        document.getElementById('password').value = null
    }

    return (
    <div>
        <h2>Log in to application</h2>
        <div>
            <form onSubmit={login}>
                <div>
                    username: <input id="username" onChange={({ target }) => setUsername(target.value)}></input>
                </div>
                <div>
                    password: <input id="password" onChange={({ target }) => setPassword(target.value)}></input>
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    </div>
    )
}

export default LoginForm