import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';

// We got combineReducers from our import statement, we did not invent this name.
export default combineReducers({
    posts: postsReducer,
    users: usersReducer
});
