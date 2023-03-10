import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialiseBlogs, addThisBlog, deleteThisBlog, likeThisBlog } from './reducers/blogReducer'
import { checkLoggedIn, logIn } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import Content from './components/Content'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import logoutService from './services/logout'

const App = () => {
  const dispatch = useDispatch()
  const notifMessage = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const notifStyle = useSelector(state => state.notificationStyle)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initialiseBlogs())
    dispatch(checkLoggedIn())
  }, [dispatch])

  const handleLogin = async (userDetails) => {
    dispatch(logIn(userDetails))
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addThisBlog(newBlog))
  }

  const increaseLikes = async (updatedBlog, id) => {
    dispatch(likeThisBlog(updatedBlog, id))
  }

  const deleteBlog = async (id) => {
    dispatch(deleteThisBlog(id))
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm handleLogin={handleLogin}/>
    </Togglable>
  )

  const loggedIn = () => (
    <Content 
      user={user} 
      logoutServiceLogout={logoutService.logout}
      addBlog={addBlog}
      blogs={blogs}
      blogFormRef={blogFormRef}
      increaseLikes={increaseLikes}
      deleteBlog={deleteBlog}
    />
  )

  return (
    <div>
      <h2>Bloglist</h2>
      <Notification message={notifMessage} style={notifStyle}/>
      {user === null ? loginForm() : loggedIn()}
    </div>
  )
}

export default App