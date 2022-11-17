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
        },
        addShelter: (state, action) =>{
            state.userDetail.Shelter = [action.payload]
        }
    }
});

// action creators are generated for each case reducer function

export const { setUser, logOutUser, addShelter } = manageUsersSlice.actions;
export const selectUsers = state => state.manageUsers


export default manageUsersSlice.reducer;