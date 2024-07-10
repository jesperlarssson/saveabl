// firebase/firebaseNewsletterConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseNewsletterConfig = {
  apiKey: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_APP_ID,
};

// Initialize Firebase app
const newsletterApp = initializeApp(firebaseNewsletterConfig, 'newsletterApp');
const db = getFirestore(newsletterApp);

export { db };

