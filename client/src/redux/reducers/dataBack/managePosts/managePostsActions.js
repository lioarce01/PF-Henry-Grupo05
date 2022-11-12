import { getPosts, getPostsById, createPost, updatePost, deletePost, sortPosts, updatePostLikes } from './managePostsSlice';
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
        console.log('res:' , res.data, id)
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
        console.log(res.data);
        dispatch(updatePost(res.data));
    } catch (err) {
        dispatch(updatePost(err.response.data));
    } finally {
        dispatch(toggleLoading())
    }
}
 
export const updatePostLikesAction = (post) => async dispatch => {
    dispatch(toggleLoading())
    try {
        const res = await axios.put('/posts/updateLikes', post);
        console.log(res.data)
        dispatch(updatePostLikes(res.data));
    } catch (err) {
        dispatch(updatePostLikes(err.response.data));
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

export const sortPostsAction = (order, type) => async dispatch => {
    dispatch(toggleLoading())
    try {       
        let {data} = await axios.get(`/posts/sort?order=${order}&type=${type}`)
        dispatch(sortPosts(data))
    } catch (err) {
        console.log(err)
    } finally {
        dispatch(toggleLoading())
    }
}