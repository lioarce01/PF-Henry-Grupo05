import { createSlice } from "@reduxjs/toolkit";

export const manageSheltersSlice = createSlice({
    name: 'manageShelters',

    initialState: {
        shelters: [],
        topShelters: [],
        details: {},
        msg: ''
    },

    reducers: {
        getShelters: (state, action) => {
            state.shelters = action.payload
        },

        getSheltersByName: (state, action) => {
            state.shelters = action.payload;
        },

        getSheltersById: (state, action) => {
            state.details = action.payload;
        },

        getSheltersTopFive: (state, action) => {
            state.topShelters = action.payload
        },
        
        createShelters: (state, action) => {
            state.msg = action.payload;
        },

        updateShelters: (state, action) => {
            state.msg = action.payload;
        },

        deleteShelters: (state, action) => {
            state.msg = action.payload;
        }
    }
});

// action creators are generated for each case reducer function
export const { getSheltersTopFive,getShelters, getSheltersByName, getSheltersById, createShelters, updateShelters, deleteShelters } = manageSheltersSlice.actions;

export default manageSheltersSlice.reducer;