import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAl7f8wmZGszC39UhyCe7Cb9FLyJ8i8uoQ",
    authDomain: "al-mustafa-card.firebaseapp.com",
    projectId: "al-mustafa-card",
    storageBucket: "al-mustafa-card.firebasestorage.app",
    messagingSenderId: "81355113967",
    appId: "1:81355113967:web:ae246661d4b384e7c0621a",
    measurementId: "G-7E3N5K7G5X",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { collection, addDoc, db, getDocs };