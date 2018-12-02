import firebase from 'firebase';
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCp29kXc75EaVFqqY7qQ_7l_JOhWROGhfc",
    authDomain: "mattyriveraproject5.firebaseapp.com",
    databaseURL: "https://mattyriveraproject5.firebaseio.com",
    projectId: "mattyriveraproject5",
    storageBucket: "mattyriveraproject5.appspot.com",
    messagingSenderId: "699678492698"
};
firebase.initializeApp(config);

export default firebase;