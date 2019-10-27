import jsonPlaceholder from '../api/jsonPlaceholder';

// Action creator for retrieving all blog posts.
export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({type: 'FETCH_POSTS', payload: response.data });
};

// Action creator for retrieving one user base on an ID.
export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({type: 'FETCH_USER', payload: response.data });
};

