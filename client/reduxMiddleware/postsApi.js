const BASE_URL = '/api/posts/';

function callAPI(endpoint) {
  let token = localStorage.getItem('id_token') || null;
  let config = {};

  if (token) {
    config = {
      headers: {'x-access-token': token}
    };
  } else {
    throw 'Error: No token';
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

export const CALL_API = Symbol('Call API');

export default () => next => action => {
  const apiCall = action[CALL_API];

  if (typeof apiCall === 'undefined') {
    return next(action);
  }

  let {endpoint, types} = apiCall;
  const [, successType, errorType] = types;

  return callAPI(endpoint).then(
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
