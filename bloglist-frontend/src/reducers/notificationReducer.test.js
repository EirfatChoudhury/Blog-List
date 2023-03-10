import notificationReducer from "./notificationReducer";
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
    test('CHANGE', () => {
        const state = ''
        const action = {
            type: 'notification/changeNotification',
            payload: 'CHANGE WORKS'
        }

        deepFreeze(state)
        const notifStore = notificationReducer(state, action)

        expect(notifStore).toContain(action.payload)
    })
    
    test('HIDE', () => {
        const state = 'Not Default State'
        const action = {
            type: 'notification/hideNotification'
        }

        deepFreeze(state)
        const notifStore = notificationReducer(state, action)

        expect(notifStore).toContain('')
    })
})