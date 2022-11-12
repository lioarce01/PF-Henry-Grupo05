import { createSlice } from "@reduxjs/toolkit";


export const managePostsSlice = createSlice({
    name: "managePosts",

    initialState: {
        posts: [],
        details: {},
        msg: ''
    },

    reducers: {
        getPosts: (state, action) => {
            state.posts = action.payload
        },

        getPostsById: (state, action) => {
            state.details = action.payload;
        },
        
        createPost: (state, action) => {
            state.msg = action.payload;
        },

        updatePost: (state, action) => {
            state.msg = action.payload;
        },

        deletePost: (state, action) => {
            state.msg = action.payload;
        },

        sortPosts: (state, action) => {
            state.posts = action.payload
        },
        cleanDetails: (state) =>{
            state.details = {}
        }
    }
});

// action creators are generated for each case reducer function
export const { getPosts, getPostsById, createPost, updatePost, deletePost, sortPosts, cleanDetails } = managePostsSlice.actions;
export const selectPost = state => state.managePosts

export default managePostsSlice.reducer;