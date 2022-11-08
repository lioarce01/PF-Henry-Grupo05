import { configureStore } from '@reduxjs/toolkit';
import manageUsersSlice from "../reducers/dataBack/manageUsers/manageUsersSlice"; 
import managePostSlice from "../reducers/dataBack/manageUsers/manageUsersSlice"; 
import manageOngsSlice from "../reducers/dataBack/manageUsers/manageUsersSlice"; 

export default configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    reducer: {
        manageUsers: manageUsersSlice,
        managePosts: managePostSlice,
        manageOngs: manageOngsSlice
    }
})