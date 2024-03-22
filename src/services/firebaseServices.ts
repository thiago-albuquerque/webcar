import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDwq0OGuEs-eNGLC1dnWJA3BhYkYS1Hszs",
  authDomain: "webcar-3fd45.firebaseapp.com",
  projectId: "webcar-3fd45",
  storageBucket: "webcar-3fd45.appspot.com",
  messagingSenderId: "42123151515",
  appId: "1:42123151515:web:98a5f9ae077b261a101e3e",
};

const app = initializeApp(firebaseConfig);

const dataBase = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { dataBase, auth, storage };
