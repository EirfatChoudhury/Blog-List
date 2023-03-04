const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE':
            return action.payload
        case 'HIDE':
            return ''
        default:
            return state
    }
}

export default notificationReducer