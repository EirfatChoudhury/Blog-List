import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Content from './components/Content'
import blogService from './services/blogs'
import loginService from './services/login'
import logoutService from './services/logout'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log("user sent")
    }
    catch (exception) {
      console.log('Wrong credentials')
      console.log(exception)
      setTimeout(() => {
        console.log(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleBlogAdd = async (event) => {
    event.preventDefault()

    try {
      const newBlog = { title, author, url }
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle("")
      setAuthor("")
      console.log("Added post with properties:", returnedBlog)
    }
    catch (exception) {
      console.log('Failed to create blog post')
      console.log(exception)
      setTimeout(() => {
        console.log(null)
      }, 5000)
    }

    console.log("Blogs:", blogs)
  }

  const loginForm = () => (
    <LoginForm handleFunction={handleLogin} setUsername={setUsername} setPassword={setPassword}/>
  )

  const loggedIn = () => (
    <Content 
      user={user} 
      logoutServiceLogout={logoutService.logout}
      handleBlogAdd={handleBlogAdd} 
      setTitle={setTitle} 
      setAuthor={setAuthor} 
      setUrl={setUrl}
      blogs={blogs}
    />
  )

  return (
    <div>
      <h2>Bloglist</h2>
      {user === null ? loginForm() : loggedIn()}
    </div>
  )
}

export default App