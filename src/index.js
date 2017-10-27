import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import * as firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC5QbpGLGC2MxpXn8ODBDWcXCPl3mFdG-o",
    authDomain: "postpin-c9e80.firebaseapp.com",
    databaseURL: "https://postpin-c9e80.firebaseio.com",
    projectId: "postpin-c9e80",
    storageBucket: "postpin-c9e80.appspot.com",
    messagingSenderId: "172723892563"
  };
  firebase.initializeApp(config);

render(<AppContainer><App/></AppContainer>, document.querySelector('#app'));

if (module && module.hot) {
  module.hot.accept('./', () => {
    render(
      <AppContainer>
        <App/>
      </AppContainer>,
      document.querySelector('#app')
    );
  });
}
