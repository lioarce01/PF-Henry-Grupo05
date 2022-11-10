import { getComments, getCommentsById, createComment, updateComment, deleteComment } from './manageCommentsSlice';
import axios from 'axios';
import { toggleLoading } from '../loading/loadingSlice';

export const getCommentsAction = () => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.get('/comments');
        dispatch(getComments(res.data));
    } catch (err) {
        dispatch(getComments(err));
    } finally {
        dispatch(toggleLoading())
    }
}


export const getCommentsByIdAction = (id) => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.get(`/comments/${id}`);
        dispatch(getCommentsById(res.data));
    } catch (err) {
        dispatch(getCommentsById(err.response.data));
    } finally {
        dispatch(toggleLoading())
    }
}

export const createCommentAction = (comment) => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.post('/comments', comment);
        dispatch(createComment(res.data));
    } catch (err) {
        dispatch(createComment(err.response.data));
    } finally {
        dispatch(toggleLoading())
    }
}


export const updateCommentAction = (post) => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.put('/comments', post);
        dispatch(updateComment(res.data));
    } catch (err) {
        dispatch(updateComment(err.response.data));
    } finally {
        dispatch(toggleLoading())
    }
}


export const deleteCommentAction = (id) => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.delete(`/comments/${id}`);
        dispatch(deleteComment(res.data));
    } catch (err) {
        dispatch(deleteComment(err.response.data));
    } finally {
        dispatch(toggleLoading())
    }
}
