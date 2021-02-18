import firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from './config';

export async function login(email, password) {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
};

export async function register(fullname,email, password) {
  const newUser = await firebase.auth().createUserWithEmailAndPassword(
    email,
    password
  );
  await addDataToCollactionWithId('user',newUser.uid,{email:email,fullname:fullname});
  return await newUser.user.updateProfile({
    displayName: fullname
  });
};

export async function logout() {
  return await firebase.auth().signOut();
}

export async function resetPassword(email) {
  return await firebase.auth().sendPasswordResetEmail(email);
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export async function addDataToCollactionWithId(collection,id,data) {
  return firebase.firestore().collection(collection).doc(id).set(data);
}

export default firebase;
export const db = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();