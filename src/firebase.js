// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZvPZ6zuqonifTvRJ-3LwGLJcBvvciCFo",
  authDomain: "gamedb-c53e1.firebaseapp.com",
  projectId: "gamedb-c53e1",
  storageBucket: "gamedb-c53e1.firebasestorage.app",
  messagingSenderId: "733872185010",
  appId: "1:733872185010:web:de5ce4944a57481008f3ab",
  measurementId: "G-H62QEQHN39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);