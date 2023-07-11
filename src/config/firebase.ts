import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBEY5Bmv2LBUkyeZC9HXeHH6_HWuJ8vZjI",
    authDomain: "trackr-api-238b6.firebaseapp.com",
    projectId: "trackr-api-238b6",
    storageBucket: "trackr-api-238b6.appspot.com",
    messagingSenderId: "45651809823",
    appId: "1:45651809823:web:f46356a4ecc5441793a72a",
    measurementId: "G-LF2TND3P5Q"
  };

const admin = initializeApp(firebaseConfig);

const db = getFirestore();
export { db, admin };