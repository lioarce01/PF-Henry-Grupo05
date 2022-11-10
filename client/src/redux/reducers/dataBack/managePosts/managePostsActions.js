import { getPosts, getPostsById, createPost, updatePost, deletePost } from './managePostsSlice';
import axios from 'axios';
import { toggleLoading } from '../loading/loadingSlice';

export const getPostsAction = () => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.get('/posts');
        dispatch(getPosts(res.data));
    } catch (err) {
        dispatch(getPosts(err));
    } finally {
        dispatch(toggleLoading())
    }
}


export const getPostsByIdAction = (id) => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.get(`/posts/${id}`);
        dispatch(getPostsById(res.data));
    } catch (err) {
        dispatch(getPostsById(err.response.data));
    } finally {
        dispatch(toggleLoading())
    }
}

export const createPostAction = (post) => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.post('/posts', post);
        dispatch(createPost(res.data));
    } catch (err) {
        dispatch(createPost(err.response.data));
    } finally {
        dispatch(toggleLoading())
    }
}


export const updatePostAction = (post) => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.put('/posts', post);
        dispatch(updatePost(res.data));
    } catch (err) {
        dispatch(updatePost(err.response.data));
    } finally {
        dispatch(toggleLoading())
    }
}
   


export const deletePostAction = (id) => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.delete(`/posts/${id}`);
        dispatch(deletePost(res.data));
    } catch (err) {
        dispatch(deletePost(err.response.data));
    } finally {
        dispatch(toggleLoading())
    }
}
