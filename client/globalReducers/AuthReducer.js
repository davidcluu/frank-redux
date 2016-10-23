import {INIT_AUTH, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS} from './AuthActions';

var isAuthenticated;
if (typeof localStorage === 'undefined') {
  isAuthenticated = false;
} else if (localStorage.getItem('id_token')) {
  isAuthenticated = true;
} else {
  isAuthenticated = false;
}

const initialState = {
  isFetching: false,
  isAuthenticated: isAuthenticated
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case INIT_AUTH:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated
      });
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    default:
      return state;
  }
};

export default auth;
