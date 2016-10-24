import {CALL_API} from '../../reduxMiddleware/postsApi';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_SUCCESS = 'POSTS_SUCCESS';
export const POSTS_FAILURE = 'POSTS_FAILURE';

export function fetchPosts() {
  return {
    [CALL_API]: {
      endpoint: 'allPosts',
      method: 'GET',
      types: [POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE]
    }
  };
}
