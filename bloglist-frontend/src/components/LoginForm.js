import { useState } from "react"
import PropTypes from 'prop-types'

const LoginForm = ( {handleLogin} ) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')

    const login = (event) => {
        event.preventDefault()
        handleLogin({username, password})
        setUsername(null)
        setPassword(null)
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

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired
}