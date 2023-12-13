// Simon
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEfVkn5yiIjmPlmuzuBCQesqXXZ2xsBgE",
  authDomain: "four-amigos-843f4.firebaseapp.com",
  projectId: "four-amigos-843f4",
  storageBucket: "four-amigos-843f4.appspot.com",
  messagingSenderId: "622793869401",
  appId: "1:622793869401:web:8b435f354f491b6dd10948",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
