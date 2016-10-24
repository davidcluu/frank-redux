import React from 'react';
import {Route, IndexRoute} from 'react-router';

import AppContainer from './containers/AppContainer/AppContainer';

import App from './modules/App/App';
import Index from './modules/Index/Index';
import Login from './modules/Login/Login';

export default (
  <Route path='/' component={AppContainer}>
    <Route component={App}>
      <IndexRoute component={Index} />
    </Route>
    <Route path='login' component={Login} />
  </Route>
);
