// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyCAJAAZA7CfLrc8M6gGPOOGvQjz-GElwk4",
  authDomain: "advanceweb-606d4.firebaseapp.com",
  projectId: "advanceweb-606d4",
  storageBucket: "advanceweb-606d4.appspot.com",
  messagingSenderId: "660537721526",
  appId: "1:660537721526:web:2774dc0f5628ccd3339c17",
  measurementId: "G-DYRGQC8BRW"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fs = getFirestore(app);
const storage = getStorage(app);

export {auth, fs, storage}
