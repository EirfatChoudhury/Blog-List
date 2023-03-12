import { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Content from './components/Content'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'
import logoutService from './services/logout'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getBlogs, createBlog, setToken, likeBlog, delBlog } from './requests'
import { useNotificationValue, useNotificationDispatch } from './contexts/NotificationContext'
import { useNotificationStyleDispatch, useNotificationStyleValue } from './contexts/NotificationStyleContext'
import { useUserDispatch, useUserValue } from './contexts/UserContext'

const App = () => {
  const queryClient = useQueryClient()

  const notifMessage = useNotificationValue()
  const notifDispatch = useNotificationDispatch()
  const notifStyle = useNotificationStyleValue()
  const notifStyleDispatch = useNotificationStyleDispatch()
  const user = useUserValue()
  const userDispatch = useUserDispatch()
  
  const result = useQuery('blogs', getBlogs, {retry: false, refetchOnWindowFocus: false})
  console.log("My useQuery result:", result)
  let blogs = []
  if (result.data !== undefined) {
    blogs = result.data
    console.log("Blogs:", blogs)
  }

  const newBlogMutation = useMutation(createBlog, { onSuccess: () => queryClient.invalidateQueries('blogs')})
  const likeBlogMutation = useMutation(likeBlog, { onSuccess: () => queryClient.invalidateQueries('blogs')})
  const deleteBlogMutation = useMutation(delBlog, { onSuccess: () => queryClient.invalidateQueries('blogs')})

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedInUser = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'LOG_IN', payload: loggedInUser})
      setToken(loggedInUser.token)
    }}, [])

  const handleLogin = async (userDetails) => {
    try {
      const loggedInUser = await loginService.login(userDetails)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(loggedInUser)
      )
      setToken(loggedInUser.token)
      userDispatch({ type: 'LOG_IN', payload: loggedInUser})
      console.log(`user with username ${userDetails.username} successfully logged in`)
    }
    catch (exception) {
      console.log('Wrong credentials')
      console.log(exception)
      notifDispatch({type: 'CHANGE', payload: 'Incorrect username or password'})
      notifStyleDispatch({ type: 'ERROR'})
    }

    setTimeout(() => {
      notifDispatch({type: 'HIDE'})
    }, 5000);
  }

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      newBlogMutation.mutate(newBlog)
      notifDispatch({type: 'CHANGE', payload: `Successfully added ${newBlog.title} to Bloglist`})
      notifStyleDispatch({ type: 'SUCCESS'})
    }
    catch (exception) {
      console.log('Failed to create blog post')
      console.log(exception)
      notifDispatch({type: 'CHANGE', payload: `Failed to add ${newBlog.title} to Bloglist`})
      notifStyleDispatch({ type: 'ERROR'})
    }

    setTimeout(() => {
      notifDispatch({type: 'HIDE'})
    }, 5000);

  }

  const increaseLikes = async (updatedBlog, id) => {
    console.log(typeof(id))
    try {
      likeBlogMutation.mutate(updatedBlog, id)
    }
    catch (exception) {
      console.log('Failed to update blog post')
      console.log(exception)
    }
  }

  const deleteBlog = async (id) => {
    try {
      deleteBlogMutation.mutate(id)
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