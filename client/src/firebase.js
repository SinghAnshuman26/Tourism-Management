// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//temporary souls firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "travel-and-tourism-50943.firebaseapp.com",
  projectId: "travel-and-tourism-50943",
  storageBucket: "travel-and-tourism-50943.appspot.com",
  messagingSenderId: "23151456147",
  appId: "1:23151456147:web:4fdfb8c5a81fb8cc3a4266",
  


  // authDomain: "travel-and-tourism-50943.firebaseapp.com",
  // projectId: "travel-and-tourism-50943",
  // storageBucket: "travel-and-tourism-50943.appspot.com",
  // messagingSenderId: "23151456147",
  // appId: "1:23151456147:web:4fdfb8c5a81fb8cc3a4266",
  // measurementId: "G-91PC72MY4C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
