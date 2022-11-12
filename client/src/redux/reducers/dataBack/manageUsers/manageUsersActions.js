import { getUsers, getUserById, getUserByName, createUser, updateUser, deleteUser, getFollowing } from './manageUsersSlice';
import axios from 'axios';
import { toggleLoading } from '../loading/loadingSlice';


export const getUsersAction = () => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.get('/users');
        dispatch(getUsers(res.data));
    } catch (err) {
        dispatch(getUsers(err.response.data));
    } finally {
        dispatch(toggleLoading())
    }
}


export const getUserByIdAction = (id) => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.get(`/users/${id}`);
        dispatch(getUserById(res.data));
    } catch (err) {
        dispatch(getUserById(err.response.data));
    } finally {
        dispatch(toggleLoading())
    }
}


export const getUserByNameAction = (name) => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.get(`/users?name=${name}`);
        dispatch(getUserByName(res.data));
    } catch (err) {
        dispatch(getUserByName(err.response.data));
    } finally {
        dispatch(toggleLoading())
    }
}


export const createUserAction = (user) => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.post('/users', user);
        dispatch(createUser(res.data));
    } catch (err) {
        dispatch(createUser(err.response.data));
    } finally {
        dispatch(toggleLoading())
    }
}


export const updateUserAction = (user) => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.put('/users', user);
        dispatch(updateUser(res.data));
        console.log('following: ',res.data)
    } catch (err) {
        dispatch(updateUser(err.response.data));
    } finally {
        dispatch(toggleLoading())
    }
}


export const deleteUserAction = (id) => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.delete(`/users/${id}`);
        dispatch(deleteUser(res.data));
    } catch (err) {
        dispatch(deleteUser(err.response.data));
    } finally {
        dispatch(toggleLoading())
    }
}

export const getFollowingAction = (id) => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.get(`/users/${id}/following`);
        dispatch(getFollowing(res.data));
    } catch (err) {
        dispatch(getFollowing(err.response.data));
    } finally {
        dispatch(toggleLoading())
    }
}
