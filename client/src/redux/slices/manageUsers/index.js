import { createSlice } from "@reduxjs/toolkit";


export const manageUsersSlice = createSlice({
    name: "manageUsers",

    initialState: {
        userDetail: {},
        isAuth: false,
    },

    reducers: {
        setUser: (state, action) => {
            state.userDetail = action.payload.userDetail
            state.isAuth = action.payload.isAuth
        },
        logOutUser: (state, action) => {
            state.userDetail = {}
            state.isAuth = false
        }
    }
});

// action creators are generated for each case reducer function
export const { setUser, logOutUser } = manageUsersSlice.actions;
export const selectUsers = state => state.localStorage.userState;

export default manageUsersSlice.reducer;