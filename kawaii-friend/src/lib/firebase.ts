import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKId1CYbXDY_v4l9outWg3Bg00XAEsUlM",
  authDomain: "kawaii-friend-c6e94.firebaseapp.com",
  projectId: "kawaii-friend-c6e94",
  storageBucket: "kawaii-friend-c6e94.firebasestorage.app",
  messagingSenderId: "63351508986",
  appId: "1:63351508986:web:5142631ddba9681dd8de43",
  measurementId: "G-FW45ZNBY2Y",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
