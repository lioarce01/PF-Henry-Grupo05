import { createSlice } from "@reduxjs/toolkit";

export const manageCommentsSlice = createSlice({
    name: 'manageComments',

    initialState: {
        comments: [],
        details: {},
        msg: ''
    },

    reducers: {
        getComments: (state, action) => {
            state.comments = action.payload
        },

        getCommentsById: (state, action) => {
            state.details = action.payload;
        },
        
        createComment: (state, action) => {
            state.msg = action.payload;
        },

        updateComment: (state, action) => {
            state.msg = action.payload;
        },

        deleteComment: (state, action) => {
            state.msg = action.payload;
        }
    }
});

// action creators are generated for each case reducer function
export const { getComments, getCommentsById, createComment, updateComment, deleteComment } = manageCommentsSlice.actions;
export const selectComment = state => state.manageCommentsSlice

export default manageCommentsSlice.reducer;