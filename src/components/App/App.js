import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import AccountIcon from './../GlyphIcons/AccountIcon';
import HomeIcon from './../GlyphIcons/HomeIcon';
import style from './App.scss';
import SearchPage from './../SearchPage';
import StartPage from './../StartPage';
import PostingPage from './../PostingPage';
import CreateAccountPage from './../CreateAccountPage';
import SignInPage from './../SignInPage';
import Logo from './../Logo';
import SearchResultsPage from './../SearchResultsPage';
import AccountManagement from './../AccountManagement';
import ViewPost from './../ViewPost';


/**
 * App Component
 * @type {Class}
 */
class App extends React.Component {

  // Initialize Firebase
  constructor(props) {
    super(props);
  }

  /**
   * Render function for App Component
   * @return {JSX} Component to render
   */
  render () {
    return (
      <Router>
        <div className={style.container}>
          <Route path='/' component={AccountIcon} />
          <Route path='/' component={HomeIcon} />
          <Route path='/some/where' component={Logo} />
          <Route path='/accounts/' component={Logo} />

          <Route exact={true} path="/" render={()=> (
            <StartPage />
          )} />
          <main>
            <Route exact={true} path="/some/where" render={()=> (
              <SearchPage />
            )} />
            <Route exact={true} path="/some/where/AccountManagement" render={()=> (
              <AccountManagement />
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
            <Route exact={true} path="/some/where/search" render={()=> (
              <SearchResultsPage userSearch={sessionStorage.getItem("userSearch")} />
            )} />
            <Route exact={true} path="/some/where/search/posting" render={()=> (
              <ViewPost />
            )} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
