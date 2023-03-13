import { useState } from "react"
import { setToken } from "../requests"
import { useUserDispatch } from "../contexts/UserContext"
import { useNotificationDispatch } from "../contexts/NotificationContext"
import { useNotificationStyleDispatch } from "../contexts/NotificationStyleContext"
import loginService from "../services/login"

const LoginForm = () => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const userDispatch = useUserDispatch()
    const notifDispatch = useNotificationDispatch()
    const notifStyleDispatch = useNotificationStyleDispatch()

    const login = async (event) => {
        event.preventDefault()
        try {
            const loggedInUser = await loginService.login({username, password})
            window.localStorage.setItem(
              'loggedBloglistUser', JSON.stringify(loggedInUser)
            )
            setToken(loggedInUser.token)
            userDispatch({ type: 'LOG_IN', payload: loggedInUser})
            console.log(`user with username ${username} successfully logged in`)
        }
        catch (exception) {
            console.log('Wrong credentials')
            console.log(exception)
            notifDispatch({type: 'CHANGE', payload: 'Incorrect username or password'})
            notifStyleDispatch({ type: 'ERROR'})
        }
        setUsername(null)
        setPassword(null)
        document.getElementById('username').value = null
        document.getElementById('password').value = null

        setTimeout(() => {
            notifDispatch({type: 'HIDE'})
        }, 5000);
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