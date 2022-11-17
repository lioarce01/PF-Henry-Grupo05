import { createSlice } from "@reduxjs/toolkit";


export const manageUsersSlice = createSlice({
    name: "manageUsers",

    initialState: {
        userDetail: {},
        isAuth: false,
        likes: [],
    },

    reducers: {
        setUser: (state, action) => {
            state.userDetail = action.payload.userDetail
            state.isAuth = action.payload.isAuth
        },
        logOutUser: (state, action) => {
            state.userDetail = {}
            state.isAuth = false
        },
        addShelter: (state, action) =>{
            state.userDetail.Shelter = [action.payload]
        },
        addLike: (state, action) =>{
            state.likes = [...state.likes, action.payload]
        },
        removeLike: (state, action) =>{
            state.likes = [...state.likes].filter(postId => postId !== action.payload)
        },

    
    }
});

// action creators are generated for each case reducer function

export const { setUser, logOutUser, addShelter, addLike, removeLike } = manageUsersSlice.actions;
export const selectUser = state => state.localStorage.userState


export default manageUsersSlice.reducer;