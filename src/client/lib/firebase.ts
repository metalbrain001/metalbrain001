// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfGwPoN39Jk6RHo_6vToU6s-1AAGQUHxo",
  authDomain: "movierecommender-2958a.firebaseapp.com",
  projectId: "movierecommender-2958a",
  storageBucket: "movierecommender-2958a.firebasestorage.app",
  messagingSenderId: "68197875118",
  appId: "1:68197875118:web:3beee93263625894ba9c3f",
  measurementId: "G-XYQ4LCXJBL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
