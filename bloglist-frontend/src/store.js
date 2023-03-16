import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer';
import notificationStyleReducer from './reducers/notificationStyleReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    notificationStyle: notificationStyleReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer
  }
})

store.subscribe(() => {
  console.log("State:", store.getState())
})

export default store