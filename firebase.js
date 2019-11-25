import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyByxBWqHNSF9hkazG0-CDOrnDMp442l1ng",
    authDomain: "scyre-web-app.firebaseapp.com",
    databaseURL: "https://scyre-web-app.firebaseio.com",
    projectId: "scyre-web-app",
    storageBucket: "scyre-web-app.appspot.com",
    messagingSenderId: "871044502980",
    appId: "1:871044502980:web:39a6c805c032f311"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;