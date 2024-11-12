// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

// Konfigurasi Firebase dari Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCJp4H5ghdl6H33ZeKshJYJXgBefbDxU9k",
  authDomain: "jokka-1d960.firebaseapp.com",
  projectId: "jokka-1d960",
  storageBucket: "jokka-1d960.appspot.com", // pastikan domain storageBucket benar
  messagingSenderId: "864377506222",
  appId: "1:864377506222:web:928cefa88d24c3dfaae03f",
  measurementId: "G-HKNW3YLHE4",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Analytics (hanya berjalan di browser)
let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Inisialisasi Firestore
const firestore: Firestore = getFirestore(app);

// Inisialisasi Authentication
const auth: Auth = getAuth(app);

export { app, analytics, firestore, auth };
