import { setUser, logOutUser, addShelter, addLike, removeLike } from "./index";

export const logOutUserAction = () => (dispatch) => {
  dispatch(logOutUser());
}

export const setUserAction = (userDetail, isAuth) => (dispatch) => {
  dispatch(setUser({userDetail, isAuth}));
}

export const addShelterAction= (shelter)=> (dispatch) =>{
  dispatch(addShelter(shelter));
}
export const addLikeAction= (postId)=> (dispatch) =>{
  dispatch(addLike(postId));
}
export const removeLikeAction= (postId)=> (dispatch) =>{
  dispatch(removeLike(postId));
}
