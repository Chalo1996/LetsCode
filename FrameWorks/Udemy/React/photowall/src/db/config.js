import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZ0J2mFpmkSbeqRlSvPHBrbv0z1NU5EVg",
  authDomain: "photowall-786cb.firebaseapp.com",
  projectId: "photowall-786cb",
  storageBucket: "photowall-786cb.appspot.com",
  messagingSenderId: "579184649222",
  appId: "1:579184649222:web:746e301cec6b14009dcf87",
  measurementId: "G-21R9M842WJ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
