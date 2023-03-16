import { createSlice } from "@reduxjs/toolkit"

const notificiationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        newNotification(state, action) {
            console.log("Notification being changed to:", action.payload)
            return action.payload
        },
        hideNotification(state, action) {
            console.log("Notification being changed back to: ''")
            return ''
        }
    }
})

export const { newNotification, hideNotification } = notificiationSlice.actions

export const changeNotification = ( content ) => {
    return async dispatch => {
        window.scrollTo(0, 0)
        dispatch(newNotification(content))
        setTimeout(() => {dispatch(hideNotification())}, 5000)
    }
}

export default notificiationSlice.reducer