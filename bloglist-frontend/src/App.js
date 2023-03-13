import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Content from './components/Content'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setToken} from './requests'
import { useUserDispatch, useUserValue } from './contexts/UserContext'

const App = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedInUser = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'LOG_IN', payload: loggedInUser})
      setToken(loggedInUser.token)
    }}, [])

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm/>
    </Togglable>
  )

  const loggedIn = () => (
    <Content/>
  )

  return (
    <div>
      <h2>Bloglist</h2>
      <Notification/>
      {user === null ? loginForm() : loggedIn()}
    </div>
  )
}

export default App