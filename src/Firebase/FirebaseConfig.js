import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// console.log(process.env.REACT_APP_API_KEY);

const firebaseConfig = {
    apiKey: "AIzaSyDv__-F_vuWplY2H33Sgrr7BkQpPMGYbT0",
    authDomain: "typing-speed-test-app-58cca.firebaseapp.com",
    projectId: "typing-speed-test-app-58cca",
    storageBucket: "typing-speed-test-app-58cca.appspot.com",
    messagingSenderId: "962540649024",
    appId: "1:962540649024:web:3b2eef5ab3c3c8dfc2bda5",
    measurementId: "G-97T50Z07T3"
};

// To Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// we will use below two objects throughout the application to cummunicate with firebase
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };