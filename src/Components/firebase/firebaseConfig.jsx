// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz2MAlBr4suBlJfEbov4MVktpYmtSNh0g",
  authDomain: "pursuit-hackathon.firebaseapp.com",
  projectId: "pursuit-hackathon",
  storageBucket: "pursuit-hackathon.appspot.com",
  messagingSenderId: "16142336646",
  appId: "1:16142336646:web:be51bd8d9d211d1a368707",
  measurementId: "G-BPFYJ03VYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };