import { configureStore } from '@reduxjs/toolkit';
import manageUsersSlice from "../reducers/dataBack/manageUsers/manageUsersSlice"; 
import managePostsSlice from "../reducers/dataBack/managePosts/managePostsSlice"; 
import manageOngsSlice from "../reducers/dataBack/manageOngs/manageOngsSlice"; 

export default configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    reducer: {
        manageUsers: manageUsersSlice,
        managePosts: managePostsSlice,
        manageOngs: manageOngsSlice
    }
})