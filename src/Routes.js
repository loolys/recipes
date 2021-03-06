import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App/App';
import IndexPage from './components/IndexPage/IndexPage';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import NewRecipe from './components/NewRecipe/NewRecipe';
import Recipe from './components/Recipe/Recipe';
import Profile from './components/Profile/Profile';
import SavedRecipes from './components/Profile/SavedRecipes';
import SearchResults from './components/SearchResults/SearchResults';

import requireAuth from './utils/requireAuth';

const Routes = props => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRoute component={IndexPage} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/new-recipe" component={requireAuth(NewRecipe)} />
      <Route path="/recipe/:id" component={Recipe} />
      <Route path="/edit/:id" component={NewRecipe} />
      <Route path="/profile/:user" component={requireAuth(Profile)} />
      <Route path="/profile/saved/:user" component={requireAuth(SavedRecipes)} />
      <Route path="/search-results" component={SearchResults} />
    </Route>
  </Router>
);

export default Routes;
