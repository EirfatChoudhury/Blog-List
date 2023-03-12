import { createContext, useReducer, useContext } from "react";

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return action.payload
    }
}

const UserContext = createContext()

export default UserContext

export const UserContextProvider = ( props ) => {
    const [user, userDispatch] = useReducer(userReducer, null)

    return(
        <UserContext.Provider value={[user, userDispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserValue = () => {
    const userValueAndDispatch = useContext(UserContext)
    return userValueAndDispatch[0]
}

export const useUserDispatch = () => {
    const userValueAndDispatch = useContext(UserContext)
    return userValueAndDispatch[1]
}