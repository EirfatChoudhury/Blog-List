import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { initialiseBlogs } from './reducers/blogReducer'
import { initialiseUsers } from './reducers/usersReducer'
import { checkLoggedIn } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import Content from './components/Content'
import Header from './components/Header'
import UsersTable from './components/UsersTable'
import UserInfo from './components/UserInfo'
import Blog from './components/Blog'
import NavigationBar from './components/NavigationBar'
import RegisterForm from './components/RegisterForm'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initialiseBlogs())
    dispatch(initialiseUsers())
    dispatch(checkLoggedIn())
  }, [dispatch])

  return (
      <div className='container'>
        <Router>
          <NavigationBar />

          <Header key={'header'}/>

          <Routes>
            <Route path='/login' element={user ? <Navigate replace to='/blogs' /> : <LoginForm />} />
            <Route path='/blogs' element={<Content />} />
            <Route path='/users' element={<UsersTable />} />
            <Route path='/users/:id' element={<UserInfo />} />
            <Route path='/blogs/:id' element={<Blog />} />
            <Route path='/register' element={<RegisterForm />} />
          </Routes>
        </Router>
      </div>
  )
}

export default App