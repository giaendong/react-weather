import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../views/Home';
import NotFound from '../views/404';

const publicPath = '/';

export const routeCodes = {
  HOME: publicPath
};

export default () => (
  <Switch>
    <Route exact path={ routeCodes.HOME } component={ Home } />
    <Route path='*' component={ NotFound } />
  </Switch>
);
