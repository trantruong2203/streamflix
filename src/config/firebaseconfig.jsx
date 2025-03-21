import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, deleteDoc  } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJOJm5Qg0XY3zK9nIejYbWSTTLXfxaVSE",
    authDomain: "streamflix-5a064.firebaseapp.com",
    projectId: "streamflix-5a064",
    storageBucket: "streamflix-5a064.firebasestorage.app",
    messagingSenderId: "304334154922",
    appId: "1:304334154922:web:76720131a95a06248e74d3",
    measurementId: "G-4ZEZPX67V5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Firebase services
export { db, collection, getDocs, doc, deleteDoc };
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();