import {POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE} from './IndexActions';

const initialState = {
  isFetching: false,
  posts: []
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case POSTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        posts: action.response
      });
    case POSTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
};

export default posts;
