import { createSlice } from "@reduxjs/toolkit";

export const managePostsSlice = createSlice({
    name: 'managePosts',

    initialState: {
        posts: [],
        details: [],
        msg: ''
    },

    reducers: {
        getPosts: (state, action) => {
            state.posts = action.payload
        },

        getPostsByName: (state, action) => {
            state.posts = action.payload;
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

        sortPost: (state, action) => {
            state.posts = action.payload
        }
    }
});

// action creators are generated for each case reducer function
export const { getPosts, getPostsByName, getPostsById, createPost, updatePost, deletePost, sortPost } = managePostsSlice.actions;

export default managePostsSlice.reducer;