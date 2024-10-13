// firebaseConfig.js

// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoc7r9OpDxvNt912ugEk9Q384Ph1ZLFGI",
  authDomain: "agro-connect-ef789.firebaseapp.com",
  projectId: "agro-connect-ef789",
  storageBucket: "agro-connect-ef789.appspot.com",
  messagingSenderId: "896373895772",
  appId: "1:896373895772:web:7c797a2114471a35d6ac99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Export both auth and db
export { auth, db };
