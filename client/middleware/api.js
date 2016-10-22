const BASE_URL = '/api';

function callApi (endpoint, authenticated) {
  let token = localStorage.getItem('id_token') || null
  let config = {}

  if (authenticated) {
    if (token) {
      config = {
        headers: {'Authorization': `Bearer ${token}`}
      }
    }
    else {
      throw "Error: No token saved"
    }
  }
}

export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, types, authenticated } = callAPI;

  const [ requestType, successType, errorType ] = types;
}
