import  firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC5V0jhWMW_47vyZxcHC-RsMR9lGWBvop4",
    authDomain: "clone-563f9.firebaseapp.com",
    databaseURL: "https://clone-563f9.firebaseio.com",
    projectId: "clone-563f9",
    storageBucket: "clone-563f9.appspot.com",
    messagingSenderId: "74462555151",
    appId: "1:74462555151:web:b2afcec277a7421800877a",
    measurementId: "G-P0SQK7VY8H"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);


  const db = firebaseApp.firestore()
  const auth = firebase.auth();



  export {auth,db};