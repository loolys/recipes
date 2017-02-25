import axios from 'axios';

export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post('/api/users', userData);
  };
}

export function doesUserExist(username) {
  return dispatch => {
    return axios.get(`/api/users/${username}`);
  };
}
