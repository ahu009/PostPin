import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import style from './App.scss';
import SearchPage from './../SearchPage';
import StartPage from './../StartPage';
import PostingPage from './../PostingPage';
import CreateAccountPage from './../CreateAccountPage';
import SignInPage from './../SignInPage';
import * as firebase from 'firebase';
import Logo from './../Logo';

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

            <Route path='/some/where' component={Logo} />
            <Route path='/accounts/' component={Logo} />

            <Route exact={true} path="/some/where" render={()=> (
              <SearchPage />
            )} />
            <Route exact={true} path="/some/where/else" render={()=> (
              <PostingPage />
            )} />
            <Route exact={true} path="/accounts/create-account" render={()=> (
              <CreateAccountPage />
            )} />
            <Route exact={true} path="/accounts/sign-in" render={()=> (
              <SignInPage />
            )} />
          </main>
        </div>
      </Router>
    );
  }
}
