import { createSlice } from "@reduxjs/toolkit";

export const manageOngsSlice = createSlice({
    name: 'manageOngs',

    initialState: {
        ongs: [],
        details: [],
        msg: ''
    },

    reducers: {
        getOngs: (state, action) => {
            state.ongs = action.payload
        },

        getOngsByName: (state, action) => {
            state.ongs = action.payload;
        },

        getOngsById: (state, action) => {
            state.details = action.payload;
        },
        
        createOngs: (state, action) => {
            state.msg = action.payload;
        },

        updateOngs: (state, action) => {
            state.msg = action.payload;
        },

        deleteOngs: (state, action) => {
            state.msg = action.payload;
        }
    }
});

// action creators are generated for each case reducer function
export const { getOngs, getOngsByName, getOngsById, createOngs, updateOngs, deleteOngs } = manageOngsSlice.actions;

export default manageOngsSlice.reducer;