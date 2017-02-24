import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App/App.js';
import IndexPage from './components/IndexPage/IndexPage.js';
import Signup from './components/Signup/Signup.js';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRoute component={IndexPage} />
      <Route path="/signup" component={Signup} />
    </Route>
  </Router>
);

export default Routes;
