import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import style from './App.scss';
import SearchPage from './../SearchPage';
import StartPage from './../StartPage';
import PostingPage from './../PostingPage';
import CreateAccountPage from './../CreateAccountPage';
import SignInPage from './../SignInPage';
import firebase from 'firebase';
import Logo from './../Logo';
import SearchResultsPage from './../SearchResultsPage';

/**
 * App Component
 * @type {Class}
 */
class App extends React.Component {

  // Initialize Firebase
  constructor(props) {
    super(props);
    var config = {
      apiKey: "AIzaSyC5QbpGLGC2MxpXn8ODBDWcXCPl3mFdG-o",
      authDomain: "postpin-c9e80.firebaseapp.com",
      databaseURL: "https://postpin-c9e80.firebaseio.com",
      projectId: "postpin-c9e80",
      storageBucket: "postpin-c9e80.appspot.com",
      messagingSenderId: "172723892563"
    };
    firebase.initializeApp(config);
  }

  /**
   * Render function for App Component
   * @return {JSX} Component to render
   */
  render () {
    return (
      <Router>
        <div className={style.container}>
          <Route path='/some/where' component={Logo} />
          <Route path='/accounts/' component={Logo} />
          <Route exact={true} path="/" render={()=> (
            <StartPage />
          )} />
          <main>
            <Route exact={true} path="/some/where" render={()=> (
              <SearchPage />
            )} />
            <Route exact={true} path="/some/where/else" render={()=> (
              <PostingPage />
            )} />
            <Route exact={true} path="/accounts/create-account" render={()=> (
              <CreateAccountPage db ={firebase} />
            )} />
            <Route exact={true} path="/accounts/sign-in" render={()=> (
              <SignInPage />
            )} />
            <Route exact={true} path="/some/where/search" render={()=> (
              <SearchResultsPage />
            )} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
