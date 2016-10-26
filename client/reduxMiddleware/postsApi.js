const BASE_URL = '/api/posts/';

function callAPI(endpoint, method) {
  let token = localStorage.getItem('id_token') || null;
  let config = {};

  if (token) {
    config = {
      method: method,
      headers: {'x-access-token': token}
    };
  } else {
    return Promise.reject('No token');
  }

  return fetch(BASE_URL + endpoint, config)
    .then(
      response => response.text().then(text => ({text, response}))
    ).then(({text, response}) => {
      if (!response.ok) {
        return Promise.reject(text);
      }

      return text;
    }).catch(() => {});
}

function requestAPI(requestType) {
  return {
    type: requestType
  };
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const request = action[CALL_API];

  if (typeof request === 'undefined') {
    return next(action);
  }

  let {dispatch} = store;
  let {endpoint, method, types} = request;
  const [requestType, successType, errorType] = types;

  dispatch(requestAPI(requestType));

  return callAPI(endpoint, method).then(
    response =>
      next({
        response: JSON.parse(response),
        type: successType
      }),
    error =>
      next({
        error: error.message || 'Error',
        type: errorType
      })
  );
};
