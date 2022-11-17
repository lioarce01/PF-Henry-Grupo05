import { setUser, logOutUser, addShelter } from "./index";

// export const sortSheltersAction = (order, orderType, group, groupType) => (dispatch) => {
//   dispatch(sortShelters({ order, orderType, group, groupType }));
// };

// export const searchSheltersAction = (search) => (dispatch) => {
//   dispatch(searchShelters(search));
// };
export const logOutUserAction = () => (dispatch) => {
  dispatch(logOutUser());
}

export const setUserAction = (userDetail, isAuth) => (dispatch) => {
  dispatch(setUser({userDetail, isAuth}));
}

export const addShelterAction= (shelter)=> (dispatch) =>{
  dispatch(addShelter(shelter));
}