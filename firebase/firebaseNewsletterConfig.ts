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

console.log('Firebase Config:', firebaseNewsletterConfig);  // Loggar konfigurationen för att verifiera att miljövariablerna laddas korrekt

// Initialisera Firebase-appen med konfigurationen
const newsletterApp = initializeApp(firebaseNewsletterConfig, 'newsletterApp');
console.log('Firebase app initialized:', newsletterApp.name);  // Loggar appnamnet för att verifiera att Firebase initialiseras korrekt

// Hämta Firestore-databasreferensen
const db = getFirestore(newsletterApp);
console.log('Firestore initialized:', db);  // Loggar Firestore-instansen för att verifiera åtkomst till Firestore

export { db };
