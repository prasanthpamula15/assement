// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHgDT9qyj8Gbo8Q3EOjg60Dv8-5zqsAZU",
  authDomain: "reactasses-app.firebaseapp.com",
  projectId: "reactasses-app",
  storageBucket: "reactasses-app.appspot.com",
  messagingSenderId: "916386943355",
  appId: "1:916386943355:web:90894dc93f969dfe896dde",
  measurementId: "G-785G6H9PS5"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export  const database=getFirestore(app)

