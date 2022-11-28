import { createSlice } from "@reduxjs/toolkit";


export const managePostsSlice = createSlice({
    name: "managePosts",

    initialState: {
        sort: {order: 'createdAt', type: 'asc'}
    },

    reducers: {
        sortPosts: (state, action) => {
            state.sort = action.payload
        },
    }
});

// action creators are generated for each case reducer function
export const { sortPosts } = managePostsSlice.actions;
export const selectPost = state => console.log(state.postState.sort)

export default managePostsSlice.reducer;