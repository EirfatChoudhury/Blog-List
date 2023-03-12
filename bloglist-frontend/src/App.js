import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialiseBlogs } from './reducers/blogReducer'
import { checkLoggedIn } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import Content from './components/Content'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import logoutService from './services/logout'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initialiseBlogs())
    dispatch(checkLoggedIn())
  }, [dispatch])

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm/>
    </Togglable>
  )

  const loggedIn = () => (
    <Content 
      user={user} 
      logoutServiceLogout={logoutService.logout}
      blogs={blogs}
    />
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