import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import Content from './components/Content'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import logoutService from './services/logout'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notifStyle, setNotifStyle] = useState(null)

  const dispatch = useDispatch()
  const notifMessage = useSelector(state => state)

  const blogFormRef = useRef()

  useEffect(() => {blogService.getAll().then(blogs => setBlogs(blogs))}, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }}, [])

  const handleLogin = async (userDetails) => {
    try {
      const user = await loginService.login(userDetails)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      console.log(`user with username ${userDetails.username} successfully logged in`)
    }
    catch (exception) {
      console.log('Wrong credentials')
      console.log(exception)
      dispatch({ type: 'CHANGE', payload: `Failed to login as ${userDetails.username}` })
      setNotifStyle("error")
    }

    setTimeout(() => {
      dispatch({ type: 'HIDE' })
      setNotifStyle(null)
    }, 5000);
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      console.log("Added blog with properties:", returnedBlog)
      dispatch({ type: 'CHANGE', payload: `Successfully added ${newBlog.title} to Bloglist` })
      setNotifStyle("success")
    }
    catch (exception) {
      console.log('Failed to create blog post')
      console.log(exception)
      dispatch({ type: 'CHANGE', payload: `Failed to add ${newBlog.title} to Bloglist` })
      setNotifStyle("error")
    }

    setTimeout(() => {
      dispatch({ type: 'HIDE' })
      setNotifStyle(null)
    }, 5000);

  }

  const increaseLikes = async (updatedBlog, id) => {
    const tempBlogs = blogs.filter(blog => blog.id !== id)

    try {
      const returnedBlog = await blogService.update(updatedBlog, id)
      setBlogs(tempBlogs.concat(returnedBlog))
      console.log("Updated blog to", returnedBlog)
    }
    catch (exception) {
      console.log('Failed to update blog post')
      console.log(exception)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.del(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      console.log("Blog deleted")
    }
    catch (exception) {
      console.log("Failed to delete blog")
      console.log(exception)
    }
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