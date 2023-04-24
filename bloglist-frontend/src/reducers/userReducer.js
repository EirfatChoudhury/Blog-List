import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs"
import loginService from "../services/login"
import logoutService from "../services/logout"
import { changeNotification } from "./notificationReducer";
import { errorStyle } from "./notificationStyleReducer";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setLoggedIn(state, action) {
            console.log("Setting user state as user")
            return action.payload
        },
        setLoggedOut(state, action) {
            console.log("Setting user state to empty")
            return null
        }
    }
})


export const { setLoggedIn, setLoggedOut } = userSlice.actions

export const checkLoggedIn = () => {
    return async dispatch => {
        console.log("Checking if user is logged in")
        console.log("Checking for window local storage item 'loggedBloglistUser'")
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
        if (loggedUserJSON) {
            console.log("Found loggedBlogListUser:", loggedUserJSON)
            const user = JSON.parse(loggedUserJSON)
            console.log("Setting token on user")
            await blogService.setToken(user.token)
            console.log("Token set on user")
            dispatch(setLoggedIn(user))
            console.log("Set user state as user")
        }
        else {
            console.log("No logged in user found")
        }
    }
}

export const logIn = (userDetails) => {
    return async dispatch => {
        console.log("Attempting to log in with:", userDetails)
        try {
            const user = await loginService.login(userDetails)
            console.log("Returned user:", user)
            console.log("Creating window local storage item 'loggedBloglistUser and setting its contents as JSON.stringify(user)")
            window.localStorage.setItem(
              'loggedBloglistUser', JSON.stringify(user)
            )
            console.log("Created loggedBloglistUser")
            console.log("Setting token on user")
            await blogService.setToken(user.token)
            console.log("Token set on user")
            dispatch(setLoggedIn(user))
            console.log("Set user state as user")
            console.log(`User with username ${userDetails.username} successfully logged in`)
        }
        catch (exception) {
            console.log('Wrong credentials')
            console.log(exception)
            dispatch(changeNotification(`Failed to login as ${userDetails.username}`))
            dispatch(errorStyle())
        }
    }
}

export const logOut = () => {
    return dispatch => {
        console.log("Logging out")
        logoutService.logout()
        console.log("LoggedBloglistUser cleared from storage")
        dispatch(setLoggedOut())
        console.log("Logged out")
    }
} 

export default userSlice.reducer