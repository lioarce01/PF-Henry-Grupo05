import { configureStore } from '@reduxjs/toolkit';
import manageUsersSlice from "../reducers/dataBack/manageUsers/manageUsersSlice"; 
import managePostsSlice from '../slices/managePosts';
import manageSheltersSlice from "../reducers/dataBack/manageShelters/manageSheltersSlice"; 
import manageCommentsSlice from '../reducers/dataBack/manageComments/manageCommentsSlice';
import loadingSlice  from '../reducers/dataBack/loading/loadingSlice';
import { postApi } from '../api/posts';


export default configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(postApi.middleware),
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        manageUsers: manageUsersSlice,
        managePosts: managePostsSlice,
        manageShelters: manageSheltersSlice,
        manageComments: manageCommentsSlice,
        loading: loadingSlice,
        managePosts: managePostsSlice,
    }
})