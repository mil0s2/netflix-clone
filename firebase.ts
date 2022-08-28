// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC9bC5Stm_P87rERcfaG-0AqkrNIN7_i24',
  authDomain: 'netflix-clone-proj-efc4a.firebaseapp.com',
  projectId: 'netflix-clone-proj-efc4a',
  storageBucket: 'netflix-clone-proj-efc4a.appspot.com',
  messagingSenderId: '19015045066',
  appId: '1:19015045066:web:7ecc77e01abfbfd96d4933',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
