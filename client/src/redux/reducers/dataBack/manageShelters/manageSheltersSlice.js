import { createSlice } from "@reduxjs/toolkit";

export const manageSheltersSlice = createSlice({
    name: 'manageShelters',

    initialState: {
        shelters: {}, // initialized as an object in order to load spinners
        sheltersCopy: [], // needed for filters to run properly
        topShelters: [],
        details: {},
        msg: ''
    },

    reducers: {
        getShelters: (state, action) => {
            state.shelters = action.payload
            state.sheltersCopy = action.payload
        },

        getSheltersByName: (state, action) => {
            state.shelters = action.payload
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
        },

        sortShelters : (state, action) => {
            state.shelters = action.payload
        },
        cleanSheltersDetails : (state) =>{
            state.details = {}
        }
    }
});

// action creators are generated for each case reducer function
export const { getSheltersTopFive,getShelters, getSheltersByName, getSheltersById, createShelters, updateShelters, deleteShelters, sortShelters,cleanSheltersDetails } = manageSheltersSlice.actions;
export const selectShelter = state => state.manageShelters

export default manageSheltersSlice.reducer;