import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyD5Mc-xTjO5cLl2B5cP6k8XBf9wt2_d5p0",
    authDomain: "lava-11a9b.firebaseapp.com",
    projectId: "lava-11a9b",
    storageBucket: "lava-11a9b.appspot.com",
    messagingSenderId: "571866268015",
    appId: "1:571866268015:web:078a449c8f1aece921289a",
    measurementId: "G-3ELS7MEFV7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;