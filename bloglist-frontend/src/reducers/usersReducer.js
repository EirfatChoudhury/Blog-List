import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        getUsers(state, action) {
            console.log("All users are returned to state:", action.payload)
            return action.payload
        },
        addUser(state, action) {
            console.log("Adding user to state:", action.payload)
            state.push(action.payload)
        }
    }
})

export const { getUsers, addUser } = usersSlice.actions

export const initialiseUsers = () => {
    return async dispatch => {
        console.log("Initialising users")
        const users = await usersService.getAll()
        dispatch(getUsers(users))
    }
}

export const registerUser = ( userToBeCreated ) => {
    return async dispatch => {
        try {
            console.log("Registering user:", userToBeCreated)
            const user = await usersService.create(userToBeCreated)
            console.log("User created:", user)
            dispatch(addUser(user))
        }
        catch (exception) {
            console.log("Failed to register user")
            console.log(exception)
        }
    }
}

export default usersSlice.reducer