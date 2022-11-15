import { configureStore } from '@reduxjs/toolkit';
import managePostsSlice from '../slices/managePosts';
import manageSheltersSlice from "../slices/manageShelters"; 
import { postApi } from '../api/posts';
import { usersApi } from '../api/users';
import { sheltersApi } from '../api/shelters';

export default configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(postApi.middleware, sheltersApi.middleware, usersApi.middleware),
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        [sheltersApi.reducerPath]: sheltersApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        managePosts: managePostsSlice,
        manageShelters: manageSheltersSlice,
    }
})