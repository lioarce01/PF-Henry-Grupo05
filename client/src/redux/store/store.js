import { configureStore } from '@reduxjs/toolkit';
import manageUsersSlice from "../reducers/dataBack/manageUsers/manageUsersSlice"; 
import managePostsSlice from '../slices/managePosts';
import manageSheltersSlice from "../reducers/dataBack/manageShelters/manageSheltersSlice"; 
import manageCommentsSlice from '../reducers/dataBack/manageComments/manageCommentsSlice';
import loadingSlice  from '../reducers/dataBack/loading/loadingSlice';
import { postApi } from '../api/posts';
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit';


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
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(postApi.middleware),
    reducer: {
        localStorage,
        [postApi.reducerPath]: postApi.reducer,
        manageUsers: manageUsersSlice,
        manageShelters: manageSheltersSlice,
        manageComments: manageCommentsSlice,
        loading: loadingSlice,
        managePosts: managePostsSlice,
    }
})