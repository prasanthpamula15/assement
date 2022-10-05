// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9bt9Ija9Z5SssM9XyS-vyxOjeyjjR-14",
  authDomain: "myreact-app-3bdcb.firebaseapp.com",
  projectId: "myreact-app-3bdcb",
  storageBucket: "myreact-app-3bdcb.appspot.com",
  messagingSenderId: "913789046395",
  appId: "1:913789046395:web:14568bd2ee99da18f7dcde",
  measurementId: "G-14YPS4GSQT"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export  const database=getFirestore(app)

