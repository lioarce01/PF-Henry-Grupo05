import { getPosts, getPostsById, createPost, updatePost, deletePost } from './managePostsSlice';
import axios from 'axios';

export const getPostsAction = () => async dispatch => {
    try {
        const res = await axios.get('/posts');
        dispatch(getPosts(res.data));
    } catch (err) {
        dispatch(getPosts(err));
    }
}


export const getPostsByIdAction = (id) => async dispatch => {
    try {
        const res = await axios.get(`/posts/${id}`);
        dispatch(getPostsById(res.data));
    } catch (err) {
        dispatch(getPostsById(err.response.data));
    }
}

export const createPostAction = (post) => async dispatch => {
    try {
        const res = await axios.post('/posts', post);
        dispatch(createPost(res.data));
    } catch (err) {
        dispatch(createPost(err.response.data));
    }
}


export const updatePostAction = (post) => async dispatch => {
    try {
        const res = await axios.put('/posts', post);
        dispatch(updatePost(res.data));
    } catch (err) {
        dispatch(updatePost(err.response.data));
    }
}


export const deletePostAction = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/posts/${id}`);
        dispatch(deletePost(res.data));
    } catch (err) {
        dispatch(deletePost(err.response.data));
    }
}
