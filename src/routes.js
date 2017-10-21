import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import App from './components/App';
import StartPage from './components/StartPage';
import UIComponent from './components/UIComponent';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={StartPage} />
    <Route path="/some/where" component={UIComponent} />
  </Route>
);
