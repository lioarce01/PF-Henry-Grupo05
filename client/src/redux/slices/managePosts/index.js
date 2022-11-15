import { createSlice } from "@reduxjs/toolkit";


export const managePostsSlice = createSlice({
    name: "managePosts",

    initialState: {
        sort: {order: false, type: false}
    },

    reducers: {
        sortPosts: (state, action) => {
            state.sort = action.payload
        },
    }
});

// action creators are generated for each case reducer function
export const { sortPosts } = managePostsSlice.actions;
export const selectPost = state => state.managePosts

export default managePostsSlice.reducer;