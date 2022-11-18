import { createSlice } from "@reduxjs/toolkit";


export const manageSheltersSlice = createSlice({
    name: "manageShelters",

    initialState: {
        sort: { order: "name", orderType: "asc", filter: {} },
        search: ""
    },

    reducers: {
        searchShelters: (state, action) => {
            state.search = action.payload
        },

        sortShelters: (state, action) => {
            state.sort = action.payload
        },
    }
});

// action creators are generated for each case reducer function
export const { sortShelters, searchShelters } = manageSheltersSlice.actions;
export const selectShelters = state => state.manageShelters

export default manageSheltersSlice.reducer;