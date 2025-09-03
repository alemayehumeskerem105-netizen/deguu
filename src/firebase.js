// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASlfDwStEN_t4lCn2dnC38NGMIznOroqk",
  authDomain: "speak-3a742.firebaseapp.com",
  projectId: "speak-3a742",
  storageBucket: "speak-3a742.appspot.com",
  messagingSenderId: "101105763338",
  appId: "1:101105763338:web:1badfc1d0c45749770cbf3",
  measurementId: "G-TJX2G6KSJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
