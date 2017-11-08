import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC5QbpGLGC2MxpXn8ODBDWcXCPl3mFdG-o",
  authDomain: "postpin-c9e80.firebaseapp.com",
  databaseURL: "https://postpin-c9e80.firebaseio.com",
  projectId: "postpin-c9e80",
  storageBucket: "postpin-c9e80.appspot.com",
  messagingSenderId: "172723892563"
};

firebase.initializeApp(config);
export default firebase;
