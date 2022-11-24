import { createSlice } from "@reduxjs/toolkit";


export const manageSheltersSlice = createSlice({
    name: "manageShelters",

    initialState: {
        carousel: ''
    },

    reducers: {
        carouselShelters: (state, action) => {
            state.carousel = action.payload
        }
    }
});

// action creators are generated for each case reducer function
export const { carouselShelters } = manageSheltersSlice.actions;
export const selectShelters = state => state.manageShelters

export default manageSheltersSlice.reducer;