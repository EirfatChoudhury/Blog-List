import { useState } from "react"

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
                    username: <input onChange={({ target }) => setUsername(target.value)}></input>
                </div>
                <div>
                    password: <input onChange={({ target }) => setPassword(target.value)}></input>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    </div>
    )
}

export default LoginForm