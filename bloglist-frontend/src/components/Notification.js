import { useSelector } from "react-redux"
import { Alert } from 'react-bootstrap'

const Notification = () => {
    const message = useSelector(state => state.notification)
    const style = useSelector(state => state.notificationStyle)

    if (message === '') {
      return null
    }

    const margin = {
      marginTop: 20
    }
  
    return (
      <div style={margin}>
        <Alert variant={style}>
          {message}
        </Alert>
      </div>
    )
}

export default Notification