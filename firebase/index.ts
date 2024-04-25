import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQk7j_Ki6Z-WSivsZIVchhOqOwOIpHxPU",
  authDomain: "gemina-e4f38.firebaseapp.com",
  projectId: "gemina-e4f38",
  storageBucket: "gemina-e4f38.appspot.com",
  messagingSenderId: "859772982167",
  appId: "1:859772982167:web:e21ebf82250a2926b06ad2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
