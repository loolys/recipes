import axios from 'axios';

export function createRecipe(recipe) {
  return dispatch => {
    return axios.post('/api/recipes', recipe);
  };
}
