// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3EvMDeoPYSIoZZEx2VXfB4cIUWlU--IA",
  authDomain: "reatasses.firebaseapp.com",
  projectId: "reatasses",
  storageBucket: "reatasses.appspot.com",
  messagingSenderId: "280834876200",
  appId: "1:280834876200:web:aad6564e730e3afaa6261d",
  measurementId: "G-8LQPJFFP9F"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export  const database=getFirestore(app)

