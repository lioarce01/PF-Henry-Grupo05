import { setUser, logOutUser, addShelter, addLike, removeLike, addFollowing, clearFollowing, removeFollowing } from "./index";

export const logOutUserAction = () => (dispatch) => {
  dispatch(logOutUser());
}

export const setUserAction = (userDetail, isAuth) => (dispatch) => {
  dispatch(setUser({ userDetail, isAuth }));
}

export const addShelterAction = (shelter) => (dispatch) => {
  dispatch(addShelter(shelter));
}
export const addLikeAction = (postId) => (dispatch) => {
  dispatch(addLike(postId));
}
export const removeLikeAction = (postId) => (dispatch) => {
  dispatch(removeLike(postId));
}
export const addFollowingAction = (shelter) => (dispatch) => {
  dispatch(addFollowing(shelter));
}
export const removeFollowingAction = (shelterId) => (dispatch) => {
  dispatch(removeFollowing(shelterId));
}
export const clearFollowingAction = () => (dispatch) => {
  dispatch(clearFollowing());
}