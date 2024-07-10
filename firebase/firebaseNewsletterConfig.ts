// firebaseNewsletterConfig.ts

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_APP_ID,
};

// Initialisera Firebase-appen med konfigurationen för nyhetsbrevet
const newsletterApp = initializeApp(firebaseConfig, 'newsletterApp');

// Hämta Firestore-databasreferensen för nyhetsbrevet
const db = getFirestore(newsletterApp);

export { db };
