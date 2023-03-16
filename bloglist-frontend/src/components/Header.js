import { useSelector } from 'react-redux'
import Notification from "./Notification"
import LogoutButton from "./LogoutButton"

const Header = () => {
  const user = useSelector(state => state.user)

  if (!user) {
    return(
      <div>
      <h2>Bloglist</h2>
      <Notification/>
    </div>
    )
  }

  return(
    <div>
      <h2>Bloglist</h2>
      <Notification/>
      {user.username} logged in
      <LogoutButton/>
    </div>
  )
}

export default Header