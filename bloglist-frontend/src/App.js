import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { initialiseBlogs } from './reducers/blogReducer'
import { initialiseUsers } from './reducers/usersReducer'
import { checkLoggedIn } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import Content from './components/Content'
import Header from './components/Header'
import UsersTable from './components/UsersTable'
import UserInfo from './components/UserInfo'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initialiseBlogs())
    dispatch(initialiseUsers())
    dispatch(checkLoggedIn())
  }, [dispatch])

  const padding = {
    padding: 5
  }

  return (
      <div>
        <Router>
          <div>
            <Link style={padding} to="/login">Login</Link>
            <Link style={padding} to="/blogs">Blogs</Link>
            <Link style={padding} to="/users">Users</Link>
          </div>

          <Header key={'header'}/>

          <Routes>
            <Route path='/login' element={user ? <Navigate replace to='/blogs' /> : <LoginForm />} />
            <Route path='/blogs' element={user ? <Content /> : <Navigate replace to="/login" />} />
            <Route path='/users' element={<UsersTable />} />
            <Route path='/users/:id' element={<UserInfo />} />
            <Route path='/blogs/:id' element={<Blog />} />
          </Routes>
        </Router>
      </div>
  )
}

export default App