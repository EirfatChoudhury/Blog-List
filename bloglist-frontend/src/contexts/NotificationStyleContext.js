import { createContext, useContext, useReducer } from "react"

const notificationStyleReducer = (state=null, action) => {
    switch (action.type) {
        case 'SUCCESS':
            console.log("Changing notification style to success")
            return 'success'
        case 'ERROR':
            console.log("Changing notification style to error")
            return 'error'
        default:
            return null
    }
}

const NotificationStyleContext = createContext()

export default NotificationStyleContext

export const NotificationStyleContextProvider = ( props ) => {
    const [notifStyle, notifStyleDispatch] = useReducer(notificationStyleReducer, null)

    return (
        <NotificationStyleContext.Provider value={[notifStyle, notifStyleDispatch]}>
            {props.children}
        </NotificationStyleContext.Provider>
    )
}

export const useNotificationStyleValue = () => {
    const notificationStyleAndDispatch = useContext(NotificationStyleContext)
    return notificationStyleAndDispatch[0]
}

export const useNotificationStyleDispatch = () => {
    const notificationStyleAndDispatch = useContext(NotificationStyleContext)
    return notificationStyleAndDispatch[1]
}