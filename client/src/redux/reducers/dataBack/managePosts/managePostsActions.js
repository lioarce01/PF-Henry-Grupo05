import { getPosts, getPostsByName, getPostsById, createPost, updatePost, deletePost, sortPost } from './managePostsSlice';
import axios from 'axios';

export const getPostsAction = () => async dispatch => {
    try {
        const res = await axios.get('https://dogs-backend-bautts.herokuapp.com/dogs');
        dispatch(getPosts(res.data));
    } catch (err) {
        dispatch(getPosts(err));
    }
}


export const getPostsByIdAction = (id) => async dispatch => {
    try {
        const res = await axios.get(`https://dogs-backend-bautts.herokuapp.com/dogs/${id}`);
        dispatch(getPostsById(res.data));
    } catch (err) {
        dispatch(getPostsById(err.response.data));
    }
}


export const getPostsByNameAction = (name) => async dispatch => {
    try {
        const res = await axios.get(`https://dogs-backend-bautts.herokuapp.com/dogs?name=${name}`);
        dispatch(getPostsByName(res.data));
    } catch (err) {
        dispatch(getPostsByName(err.response.data));
    }
}


export const createPostAction = (post) => async dispatch => {
    try {
        const res = await axios.post('https://dogs-backend-bautts.herokuapp.com/dogs/', post);
        dispatch(createPost(res.data));
    } catch (err) {
        dispatch(createPost(err.response.data));
    }
}


export const updatePostAction = (post) => async dispatch => {
    try {
        const res = await axios.put('https://dogs-backend-bautts.herokuapp.com/dogs/', post);
        dispatch(updatePost(res.data));
    } catch (err) {
        dispatch(updatePost(err.response.data));
    }
}


export const deletePostAction = (id) => async dispatch => {
    try {
        const res = await axios.delete('https://dogs-backend-bautts.herokuapp.com/dogs/' + id);
        dispatch(deletePost(res.data));
    } catch (err) {
        dispatch(deletePost(err.response.data));
    }
}

export const sortPostAction = (order, type) => async dispatch => {
    try {
        let res
        switch (order && type) {
            case ("rec" && "desc"): res = await axios.get(`http://localhost:3001/posts/mostRecents`)
            case ("rec" && "asc"): res = await axios.get(`http://localhost:3001/posts/oldest`)
            case ("likes" && "desc"): res = await axios.get(`http://localhost:3001/posts/mostLikes`)
        }
        dispatch(sortPost(res.data))
    } catch (err) {
      console.log(err)
    }
}
