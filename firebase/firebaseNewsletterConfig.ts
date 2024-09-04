import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_APP_ID,
};

// Kontrollera om nyhetsbrevsappen redan är initierad, annars initiera den med ett specifikt namn
let newsletterApp;
if (!getApps().some((app) => app.name === "newsletterApp")) {
  newsletterApp = initializeApp(firebaseConfig, "newsletterApp");
} else {
  newsletterApp = getApp("newsletterApp");
}

const db = getFirestore(newsletterApp);

export { db };

