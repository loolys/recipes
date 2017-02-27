import axios from 'axios';

export function login(user) {
  return dispatch => {
    return axios.post('/api/login', user);
  };
}
