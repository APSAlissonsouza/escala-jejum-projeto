import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyA8K61X2AYI0ltDGb9-qyJdk0FvLv7ed7g",
  authDomain: "escalajejumigreja.firebaseapp.com",
  projectId: "escalajejumigreja",
  storageBucket: "escalajejumigreja.firebasestorage.app",
  messagingSenderId: "529100712585",
  appId: "1:529100712585:web:5ed775e802d49293573458",
  measurementId: "G-SH60PLSGC7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);