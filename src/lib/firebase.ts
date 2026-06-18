import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCx3-cxX4nSJNuEtSufdQHmAczMxHCLzrA",
  authDomain: "top-adapter-x83b3.firebaseapp.com",
  projectId: "top-adapter-x83b3",
  storageBucket: "top-adapter-x83b3.firebasestorage.app",
  messagingSenderId: "932639447836",
  appId: "1:932639447836:web:5c3fc72f08a6f4a3bef8d9"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with Google Auth Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Firestore with custom databaseId if provided
const db = getFirestore(app, "ai-studio-680a3572-470c-4348-8d88-2984fe0cdb0f");

export { app, auth, googleProvider, db };
