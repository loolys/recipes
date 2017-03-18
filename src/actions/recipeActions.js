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
    return axios.get(`/api/recipes/specific/${id}`);
  };
}

export function editRecipe(recipe) {
  return dispatch => {
    return axios.post('/api/recipes/edit', recipe);
  };
}

export function fetchUsersRecipes(user) {
  return dispatch => {
    return axios.get(`/api/recipes/profile/${user}`);
  };
}

export function getRecipeList() {
  return dispatch => {
    return axios.get('/api/recipes/all-recipes');
  };
}

export function searchRecipes(search) {
  return dispatch => {
    return axios.post('/api/recipes/search', search);
  };
}

export function deleteRecipe(id) {
  return dispatch => {
    return axios.delete(`/api/recipes/delete/${id}`);
  };
}
