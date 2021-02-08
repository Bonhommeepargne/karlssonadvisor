import firebase from "firebase";

const config = {
    apiKey: "AIzaSyB6EaUyOgZovgkhQNtavUknKmwonKTFypc",
    authDomain: "karlsson-b78fc.firebaseapp.com",
    databaseURL: "https://karlsson-b78fc.firebaseio.com/",
    projectId: "karlsson-b78fc",
    storageBucket: "karlsson-b78fc.appspot.com",
    messagingSenderId: "305544346220",
    appId: "1:305544346220:web:0692e885a3441149d77649",
    measurementId: "G-VPK27MT23L"
};

export async function login(email, password) {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
};
export async function register(email, password) {
  return await firebase.auth().createUserWithEmailAndPassword(email, password);
};

if (!firebase.apps.length) {firebase.initializeApp(config);}
export default firebase;