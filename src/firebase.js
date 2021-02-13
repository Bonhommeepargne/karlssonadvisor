import firebase from "firebase";

const config = {

};

export async function login(email, password) {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
};
export async function register(email, password) {
  return await firebase.auth().createUserWithEmailAndPassword(email, password);
};

if (!firebase.apps.length) {firebase.initializeApp(config);}
export default firebase;
