import { createSlice } from "@reduxjs/toolkit";


export const manageThemeSlice = createSlice({
    name: "manageTheme",

    initialState: {
        darkmode: false
    },

    reducers: {
        switchTheme: (state) => {
            state.darkmode = !state.darkmode
        }
    }
});

// action creators are generated for each case reducer function
export const { switchTheme } = manageThemeSlice.actions;
export const selectTheme = state => state.localStorage.manageTheme

export default manageThemeSlice.reducer;