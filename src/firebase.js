import firebase from 'firebase';
import firebaseConfig from './config';
import "firebase/firestore"; // Database

// init firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//Auth
async function login(email, password) {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
};

async function register(fullname,email, password) {
  const newUser = await firebase.auth().createUserWithEmailAndPassword(
    email,
    password
  );
  return newUser;
};

async function logout() {
  return await firebase.auth().signOut();
}

async function resetPassword(email) {
  return await firebase.auth().sendPasswordResetEmail(email);
}


// Users
const db = firebase.firestore();
const users = db.collection('users');

async function getUser(id) {
  const res = await users.doc(id).get();
  return res.data();
}

async function addUser(id, body) {
  const docRef = users.doc(id);
  return await docRef.set(body);
}

async function updateUser(id, body) {
  const docRef = users.doc(id);
  await docRef.update(body);
}

async function readUsers() {
  const docs = await  users.get();
  docs.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });
}

export {
  firebase,
  db,
  login,
  register,
  logout,
  resetPassword,
  users,
  getUser,
  addUser,
  updateUser,
  readUsers,
};

export default firebase;