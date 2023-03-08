import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: 'study-nextjs-sample.firebaseapp.com',
  projectId: 'study-nextjs-sample',
  storageBucket: 'study-nextjs-sample.appspot.com',
  messagingSenderId: '122596188371',
  appId: '1:122596188371:web:6aaa4f0cff5ed0b4ca3426',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
