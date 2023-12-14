// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2KM2K2SqPf72D2KgSK8PgpxL5604wjys",
  authDomain: "vite-firebase-ddc67.firebaseapp.com",
  projectId: "vite-firebase-ddc67",
  storageBucket: "vite-firebase-ddc67.appspot.com",
  messagingSenderId: "642537300831",
  appId: "1:642537300831:web:7ad0fab126d0e5ff750cea",
  measurementId: "G-SWZZVKYPGN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
