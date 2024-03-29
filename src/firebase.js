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
  var user = firebase.auth().currentUser;
  await user.updateProfile({ displayName: fullname })
  await user.sendEmailVerification();
  return newUser;
};

async function sendEmailForVerification() {
  var user = firebase.auth().currentUser;
  await user.sendEmailVerification();
}

async function logout() {
  return await firebase.auth().signOut();
}

async function resetPassword(email) {
  return await firebase.auth().sendPasswordResetEmail(email);
}

// Users
const db = firebase.firestore();
const users = db.collection('users');
const watchlist = db.collection('watchlist');

async function getUser(id) {
  const res = await users.doc(id).get();
  return res.data();
}

async function addUser(id, body) {
  const docRef = users.doc(id);
  return await docRef.set(body);
}

async function addSecurityToWatchlist(body) {
  return await watchlist.add(body);
}

async function deleteSecurityToWatchlist(id) {
  return await watchlist.doc(id).delete();
}

async function updateUser(id, body) {
  const docRef = users.doc(id);
  return await docRef.update(body);
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
  sendEmailForVerification,
  users,
  getUser,
  addUser,
  updateUser,
  readUsers,
  addSecurityToWatchlist,
  deleteSecurityToWatchlist
};

export default firebase;