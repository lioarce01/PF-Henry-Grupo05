import { getUsers, getUserById, getUserByName, createUser, updateUser, deleteUser } from './manageUsersSlice';
import axios from 'axios';


export const getUsersAction = () => async dispatch => {
    try {
        const res = await axios.get('https://dogs-backend-bautts.herokuapp.com/dogs');
        dispatch(getUsers(res.data));
    } catch (err) {
        dispatch(getUsers(err.response.data));
    }
}


export const getUserByIdAction = (id) => async dispatch => {
    try {
        const res = await axios.get(`https://dogs-backend-bautts.herokuapp.com/dogs/${id}`);
        dispatch(getUserById(res.data));
    } catch (err) {
        dispatch(getUserById(err.response.data));
    }
}


export const getUserByNameAction = (name) => async dispatch => {
    try {
        const res = await axios.get(`https://dogs-backend-bautts.herokuapp.com/dogs?name=${name}`);
        dispatch(getUserByName(res.data));
    } catch (err) {
        dispatch(getUserByName(err.response.data));
    }
}


export const createUserAction = (user) => async dispatch => {
    try {
        const res = await axios.post('https://dogs-backend-bautts.herokuapp.com/dogs/', user);
        dispatch(createUser(res.data));
    } catch (err) {
        dispatch(createUser(err.response.data));
    }
}


export const updateUserAction = (user) => async dispatch => {
    try {
        const res = await axios.put('https://dogs-backend-bautts.herokuapp.com/dogs/', user);
        dispatch(updateUser(res.data));
    } catch (err) {
        dispatch(updateUser(err.response.data));
    }
}


export const deleteUserAction = (id) => async dispatch => {
    try {
        const res = await axios.delete('https://dogs-backend-bautts.herokuapp.com/dogs/' + id);
        dispatch(deleteUser(res.data));
    } catch (err) {
        dispatch(deleteUser(err.response.data));
    }
}
