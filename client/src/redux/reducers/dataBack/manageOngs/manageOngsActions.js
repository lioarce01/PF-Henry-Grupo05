import { getOngs, getOngsByName, getOngsById, createOngs, updateOngs, deleteOngs, getOngsTrending } from './manageOngsSlice';
import axios from 'axios';

export const getOngsAction = () => async dispatch => {
    try {
        const res = await axios.get('https://dogs-backend-bautts.herokuapp.com/dogs');
        console.log(res)
        dispatch(getOngs(res.data));
    } catch (err) {
        console.log(err);
        dispatch(getOngs(err));
    }
}

export const getOngsTrendingAction = () => async dispatch => {
    try {
        const res = await axios.get('https://dogs-backend-bautts.herokuapp.com/dogs');
        dispatch(getOngsTrending(res.data));
    } catch (err) {
        console.log(err);
        dispatch(getOngsTrending(err));
    }
}


export const getOngsByIdAction = (id) => async dispatch => {
    try {
        const res = await axios.get(`https://dogs-backend-bautts.herokuapp.com/dogs/${id}`);
        dispatch(getOngsByName(res.data));
    } catch (err) {
        dispatch(getOngsByName(err.response.data));
    }
}


export const getOngsByNameAction = (name) => async dispatch => {
    try {
        const res = await axios.get(`https://dogs-backend-bautts.herokuapp.com/dogs?name=${name}`);
        dispatch(getOngsById(res.data));
    } catch (err) {
        dispatch(getOngsById(err.response.data));
    }
}


export const createOngsAction = (ong) => async dispatch => {
    try {
        const res = await axios.post('https://dogs-backend-bautts.herokuapp.com/dogs/', ong);
        dispatch(createOngs(res.data));
    } catch (err) {
        dispatch(createOngs(err.response.data));
    }
}


export const updateOngsAction = (ong) => async dispatch => {
    try {
        const res = await axios.put('https://dogs-backend-bautts.herokuapp.com/dogs/', ong);
        dispatch(updateOngs(res.data));
    } catch (err) {
        dispatch(updateOngs(err.response.data));
    }
}


export const deleteOngsAction = (id) => async dispatch => {
    try {
        const res = await axios.delete('https://dogs-backend-bautts.herokuapp.com/dogs/' + id);
        dispatch(deleteOngs(res.data));
    } catch (err) {
        dispatch(deleteOngs(err.response.data));
    }
}