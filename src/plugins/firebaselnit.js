// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAdwf_O-SxWRMqWrLA5PHlAnQRXz0pj_0w",
  authDomain: "could-database.firebaseapp.com",
  projectId: "could-database",
  storageBucket: "could-database.appspot.com",
  messagingSenderId: "90370449880",
  appId: "1:90370449880:web:1b872f8906da695d4d52ad",
  measurementId: "G-LK8PLN5M98",
});

const db = getFirestore(firebaseApp);
export default db;
