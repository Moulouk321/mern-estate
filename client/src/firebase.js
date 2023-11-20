// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-state-37404.firebaseapp.com",
  projectId: "mern-state-37404",
  storageBucket: "mern-state-37404.appspot.com",
  messagingSenderId: "368555955281",
  appId: "1:368555955281:web:34e42beda611777576d470"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);