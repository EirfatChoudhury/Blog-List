import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state=null, action) => {
    switch (action.type) {
        case 'CHANGE':
            console.log("Changing notification to:", action.payload)
            return action.payload
        case 'HIDE':
            console.log("Hiding notification")
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = ( props ) => {
    const [notifMessage, notifDispatch] = useReducer(notificationReducer, null)

    return(
        <NotificationContext.Provider value= {[notifMessage, notifDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}