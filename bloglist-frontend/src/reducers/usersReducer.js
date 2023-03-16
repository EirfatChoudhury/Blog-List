import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        getUsers(state, action) {
            console.log("All users are returned to state:", action.payload)
            return action.payload
        }
    }
})

export const { getUsers } = usersSlice.actions

export const initialiseUsers = () => {
    return async dispatch => {
        console.log("Initialising users")
        const users = await usersService.getAll()
        dispatch(getUsers(users))
    }
}

export default usersSlice.reducer