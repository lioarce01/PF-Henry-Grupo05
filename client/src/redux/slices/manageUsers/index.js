import { createSlice } from "@reduxjs/toolkit";


export const manageUsersSlice = createSlice({
    name: "manageUsers",

    initialState: {
        userDetail: {},
        isAuth: false,
        likes: [],
        following: [],
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
        addFollowing: (state, action) =>{
            console.log(action.payload);
            state.following = [...state.following, action.payload] 
            console.log('followings', state.following);
        },
        removeFollowing: (state, action) =>{
            console.log(action.payload);
            state.following = [...state.following].filter(f => f.id !== action.payload) 
            console.log('followings', state.following);
        },
        clearFollowing: (state, action) =>{
            state.following = [];
        }

    
    }
});

// action creators are generated for each case reducer function

export const { setUser, logOutUser, addShelter, addLike, removeLike, addFollowing, clearFollowing, removeFollowing } = manageUsersSlice.actions;
export const selectUser = state => state.localStorage.userState


export default manageUsersSlice.reducer;