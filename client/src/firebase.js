import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA5k8-o4djPV6UH_tUOyAjMSbk3Fj1pcvE",
    authDomain: "ncdc-86101.firebaseapp.com",
    projectId: "ncdc-86101",
    storageBucket: "ncdc-86101.firebasestorage.app",
    messagingSenderId: "552527577326",
    appId: "1:552527577326:web:8433e3b0bc8b8fc5b1f3ff"
  };
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
