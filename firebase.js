// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8K61X2AYI0ltDGb9-qyJdk0FvLv7ed7g",
  authDomain: "escalajejumigreja.firebaseapp.com",
  projectId: "escalajejumigreja",
  storageBucket: "escalajejumigreja.firebasestorage.app",
  messagingSenderId: "529100712585",
  appId: "1:529100712585:web:2ca7c2c66539ed05573458",
  measurementId: "G-RE2CR46TF2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);