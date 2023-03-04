import notificationReducer from "./notificationReducer";
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
    test('CHANGE', () => {
        const state = ''
        const action = {
            type: 'CHANGE',
            payload: 'CHANGE WORKS'
        }

        deepFreeze(state)
        const notifStore = notificationReducer(state, action)

        expect(notifStore).toContain(action.payload)
    })
    
    test('HIDE', () => {
        const state = 'Not Default State'
        const action = {
            type: 'HIDE'
        }

        deepFreeze(state)
        const notifStore = notificationReducer(state, action)

        expect(notifStore).toContain('')
    })
})