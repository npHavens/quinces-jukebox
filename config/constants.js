import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDyKyNWXXWt-nPuy9aaWHRF2BmKK8M6WPY",
  authDomain: "rpt01-quinces.firebaseapp.com",
  databaseURL: "https://rpt01-quinces.firebaseio.com",
  projectId: "rpt01-quinces",
  storageBucket: "rpt01-quinces.appspot.com",
  messagingSenderId: "571856009187"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;