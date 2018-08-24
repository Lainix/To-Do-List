import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDgqVxV25CxS6wP_jbwa4UNaqikGLmbSDc",
    authDomain: "to-do-list-0.firebaseapp.com",
    databaseURL: "https://to-do-list-0.firebaseio.com",
    projectId: "to-do-list-0",
    storageBucket: "to-do-list-0.appspot.com",
    messagingSenderId: "245739777973"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
