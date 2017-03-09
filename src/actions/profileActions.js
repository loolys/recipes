import axios from 'axios';

export function saveUserRecipe(id) {
  return dispatch => {
    return axios.post('/api/profile/save', id);
  };
}

export function getSavedRecipes(user) {
  return dispatch => {
    return axios.get(`/api/profile/recipes/${user}`);
  };
}