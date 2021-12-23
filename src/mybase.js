import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {getFirestore} from "firebase/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCG_7xL5bDmSH05TGA_RdQ2JT3eyT2bZ10",
  authDomain: "mwitter-aacaa.firebaseapp.com",
  projectId: "mwitter-aacaa",
  storageBucket: "mwitter-aacaa.appspot.com",
  messagingSenderId: "933702655646",
  appId: "1:933702655646:web:8e8ff70b8b647dfd0ce58f",
  measurementId: "G-7WDVZ49J8Y"
};

export const firebaseInstance = firebase;


export default firebase.initializeApp(firebaseConfig);
export const dbService = getFirestore();
export const storageService = firebase.storage();