import { configureStore } from '@reduxjs/toolkit';
import managePostsSlice from '../slices/managePosts';
import manageSheltersSlice from "../slices/manageShelters"; 
import { postApi } from '../api/posts';
import { usersApi } from '../api/users';
import { sheltersApi } from '../api/shelters';
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit';
import { mapApi } from '../api/map';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["postState"]
}

const rootReducer = combineReducers({
    postState: managePostsSlice
    
})

const localStorage = persistReducer(persistConfig, rootReducer)

export default configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(postApi.middleware, sheltersApi.middleware, usersApi.middleware, mapApi.middleware),
    reducer: {
        localStorage,
        [mapApi.reducerPath]: mapApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
        [sheltersApi.reducerPath]: sheltersApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        managePosts: managePostsSlice,
        manageShelters: manageSheltersSlice,
    }
})