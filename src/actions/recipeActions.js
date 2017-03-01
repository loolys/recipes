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
