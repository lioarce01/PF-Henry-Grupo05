import { configureStore } from '@reduxjs/toolkit';
import manageUsersSlice from "../reducers/dataBack/manageUsers/manageUsersSlice"; 
import managePostsSlice from "../reducers/dataBack/managePosts/managePostsSlice"; 
import manageSheltersSlice from "../reducers/dataBack/manageShelters/manageSheltersSlice"; 
import manageCommentsSlice from '../reducers/dataBack/manageComments/manageCommentsSlice';

export default configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    reducer: {
        manageUsers: manageUsersSlice,
        managePosts: managePostsSlice,
        manageComments: manageCommentsSlice,
        manageShelters: manageSheltersSlice
    }
})