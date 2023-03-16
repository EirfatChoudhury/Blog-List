import { useSelector } from 'react-redux'
import Notification from "./Notification"
import LogoutButton from "./LogoutButton"

const Header = () => {
  const user = useSelector(state => state.user)

  const margin = {
    marginTop: 20
  }

  if (!user) {
    return(
      <div style={margin}>
      <h2>Bloglist</h2>
      <Notification/>
    </div>
    )
  }

  return(
    <div style={margin}>
      <h2>Bloglist</h2>
      <Notification/>
      <p style={margin}>{user.username} logged in <LogoutButton/></p>
    </div>
  )
}

export default Header