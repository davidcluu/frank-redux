import {push} from 'react-router-redux';

/* Init */

export const INIT_AUTH = 'INIT_AUTH';

function checkToken() {
  var isAuthenticated;
  if (localStorage.getItem('id_token')) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }

  return {
    type: INIT_AUTH,
    isFetching: false,
    isAuthenticated: isAuthenticated
  };
}

export function initAuth() {
  return dispatch => {
    dispatch(checkToken());
    return Promise.resolve();
  };
}


/* Login */

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

export function loginUser(creds) {
  let config = {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `username=${creds.username}&password=${creds.password}`
  };

  return dispatch => {
    dispatch(requestLogin(creds));

    return fetch('/api/user/login', config)
      .then(
        response => response.json().then(user => ({user, response}))
      ).then(({user, response}) => {
        if (!response.ok) {
          dispatch(loginError(user.error));
        } else {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('id_token', user.id_token);
          }
          dispatch(receiveLogin(user));
          dispatch(push('/'));
        }
      }).catch(() => {});
  };
}


/* Logout */

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('id_token');
    }
    dispatch(receiveLogout());
    dispatch(push('/login'));
  };
}
