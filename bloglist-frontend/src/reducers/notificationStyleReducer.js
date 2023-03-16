import { createSlice } from "@reduxjs/toolkit"

const notificationStyleSlice = createSlice({
    name: 'style',
    initialState: null,
    reducers: {
        successStyle(state, action) {
            return 'success'
        },
        errorStyle(state, action) {
            return 'danger'
        }
    }
})

export const { successStyle, errorStyle } = notificationStyleSlice.actions
export default notificationStyleSlice.reducer