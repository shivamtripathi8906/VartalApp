import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCoXs9Z7bVmwneOjaSyx7Jj1qavPMqXaVk",
    authDomain: "vartalap-message.firebaseapp.com",
    projectId: "vartalap-message",
    storageBucket: "vartalap-message.appspot.com",
    messagingSenderId: "639791397409",
    appId: "1:639791397409:web:0eadad7d368c8b9fb84160",
    measurementId: "G-EWMMWDCRD4"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const phoneProvider= firebase.auth.PhoneAuthProvider.PROVIDER_ID;
const storage = firebase.storage();

export { auth, provider, storage, phoneProvider,db };
export default db;