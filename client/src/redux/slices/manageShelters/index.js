import { createSlice } from "@reduxjs/toolkit";


export const manageSheltersSlice = createSlice({
    name: "manageShelters",

    initialState: {
        carousel: '',
        animals: []
    },

    reducers: {
        carouselShelters: (state, action) => {
            state.carousel = action.payload
        },
        setAnimals: (state, action) => {
            state.animals = action.payload
        }
        
    }
});

// action creators are generated for each case reducer function
export const { carouselShelters, setAnimals } = manageSheltersSlice.actions;
export const selectShelters = state => state.manageShelters

export default manageSheltersSlice.reducer;