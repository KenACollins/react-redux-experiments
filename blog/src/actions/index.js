import _ from 'lodash';
import jsonPlaceholder from '../api/jsonPlaceholder';

// Action creator for retrieving all blog posts.
export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({type: 'FETCH_POSTS', payload: response.data });
};

// Action creator for retrieving one blog post author based on ID.
export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({type: 'FETCH_USER', payload: response.data });
};

// Action creator that both fetches posts and unique users.
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    // Whenever we call an action creator from inside an action creator we must dispatch its result.
    // Invoking fetchPosts() returns its inner function. We need to wait for it to finish so we add 'await'.
    await dispatch(fetchPosts());

    // Lodash has two helpful methods we employ here:
    // o .map() iterates over the blog posts array and extracts the userId property from each one to form a new array.
    // o .uniq() iterates over an array of duplicate user IDs and returns an array with no duplicates.
    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // userIds.forEach(id => dispatch(fetchUser(id)));

    // Alternate way of accomplishing above using Lodash chain() method.
    _.chain(getState().posts)                       // Acting on the getState().posts array of objects that was changed by fetchPosts()...
        .map('userId')                              // Iterate over each post, extracting its userId property to a new array.
        .uniq()                                     // Return a new array of unique user IDs after removing duplicates.
        .forEach(id => dispatch(fetchUser(id)))     // Go retrieve the user info from the API for each unique user.
        .value();                                   // Execute this chain of functions.
};

// Action creator for retrieving one user based on an ID utilizing memoization to prevent calling same user more than once.
// If we had a need to re-fetch same user we would have to define another action creator that does not employ memoization.
// Function that accepts ID parameter returns a function that accepts dispatch parameter which invokes memoized version of function called one time.
/* export const fetchUser = id => dispatch => {
    fetchUserMemoized(id, dispatch);
};

const fetchUserMemoized = _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({type: 'FETCH_USER', payload: response.data });
}); */
