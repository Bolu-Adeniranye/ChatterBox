// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-3608c.firebaseapp.com",
  projectId: "reactchat-3608c",
  storageBucket: "reactchat-3608c.appspot.com",
  messagingSenderId: "201248288768",
  appId: "1:201248288768:web:a650b47b1b6cad4bef68e5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
