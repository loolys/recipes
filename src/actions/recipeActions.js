import axios from 'axios';

export function createRecipe(recipe) {
  return dispatch => {
    return axios.post('/api/recipes', recipe);
  };
}

export function getFeatured() {
  return dispatch => {
    return axios.get('/api/recipes');
  };
}

export function getRecipe(id) {
  return dispatch => {
    return axios.get(`/api/recipes/${id}`);
  };
}

export function editRecipe(recipe) {
  return dispatch => {
    return axios.post('/api/recipes/edit', recipe);
  };
}
