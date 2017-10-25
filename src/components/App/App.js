import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import style from './App.scss';
import SearchPage from './../SearchPage';
import StartPage from './../StartPage';
import * as firebase from 'firebase';

/**
 * App Component
 * @type {Class}
 */
export default class App extends React.Component {


  /**
   * Render function for App Component
   * @return {JSX} Component to render
   */
  render () {
    return (
      <Router>
        <div className={style.container}>
          <Route exact={true} path="/" render={()=> (
            <StartPage />
          )} />
          <main>
            <Route path="/some/where" component={SearchPage} />
          </main>
        </div>
      </Router>
    );
  }
}
