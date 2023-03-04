const Notification = ({ message, style }) => {
    let notifStyle = {
      color: "black",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  
    if (style === "success") {
      notifStyle = {
        color: "green"
      }
    }
    else if (style === "error") {
      notifStyle = {
        color: "red"
      }
    }

    if (message === '') {
      return null
    }
  
    return (
      <div style={notifStyle} className="notif">
        {message}
      </div>
    )
}

export default Notification