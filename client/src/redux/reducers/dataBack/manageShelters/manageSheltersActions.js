import { getShelters, getSheltersByName, getSheltersById, createShelters, updateShelters, deleteShelters, getSheltersTopFive } from './manageSheltersSlice';
import axios from 'axios';

export const getSheltersAction = () => async dispatch => {
    try {
        const res = await axios.get('/shelters');
        console.log(res)
        dispatch(getShelters(res.data));
    } catch (err) {
        console.log(err);
        dispatch(getShelters(err));
    }
}

export const getSheltersTopFiveAction = () => async dispatch => {
    try {
        const res = await axios.get('/shelters/topFive');
        dispatch(getSheltersTopFive(res.data));
    } catch (err) {
        console.log(err);
        dispatch(getSheltersTopFive(err));
    }
}


export const getSheltersByIdAction = (id) => async dispatch => {
    try {
        const res = await axios.get(`/shelters/${id}`);
        dispatch(getSheltersByName(res.data));
    } catch (err) {
        dispatch(getSheltersByName(err.response.data));
    }
}


export const getSheltersByNameAction = (name) => async dispatch => {
    try {
        const res = await axios.get(`/shelters?name=${name}`);
        dispatch(getSheltersById(res.data));
    } catch (err) {
        dispatch(getSheltersById(err.response.data));
    }
}


export const createSheltersAction = (shelter) => async dispatch => {
    try {
        const res = await axios.post('/shelters', shelter);
        dispatch(createShelters(res.data));
    } catch (err) {
        dispatch(createShelters(err.response.data));
    }
}


export const updateSheltersAction = (shelters) => async dispatch => {
    try {
        const res = await axios.put('/shelters', shelters);
        dispatch(updateShelters(res.data));
    } catch (err) {
        dispatch(updateShelters(err.response.data));
    }
}


export const deleteSheltersAction = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/shelters/${id}`);
        dispatch(deleteShelters(res.data));
    } catch (err) {
        dispatch(deleteShelters(err.response.data));
    }
}