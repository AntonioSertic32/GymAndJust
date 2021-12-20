import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDV_zNq5hAgpnck4QBLIve2os4UHjjiUB0",
    authDomain: "gymandjust.firebaseapp.com",
    databaseURL: "https://gymandjust-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gymandjust",
    storageBucket: "gymandjust.appspot.com",
    messagingSenderId: "307640119040",
    appId: "1:307640119040:web:3b0dc68250ed032b5bcde5",
    measurementId: "G-5HLH7PZ7S1"
  };

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })
