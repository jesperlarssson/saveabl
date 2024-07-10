// firebase/firebaseNewsletterConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseNewsletterConfig = {
  apiKey: 'AIzaSyBCPRUF08W6zMiT3ZwD1vZquoyMdN0sNsI',
  authDomain: 'saveabl-newsletter.firebaseapp.com',
  projectId: 'saveabl-newsletter',
  storageBucket: 'saveabl-newsletter.appspot.com',
  messagingSenderId: '104769453212',
  appId: '1:104769453212:web:fcca69ef3f60c78921c159',
};

console.log('Firebase Config:', firebaseNewsletterConfig);  // Loggar konfigurationen för att verifiera att miljövariablerna laddas korrekt

// Initialisera Firebase-appen med konfigurationen
const newsletterApp = initializeApp(firebaseNewsletterConfig, 'newsletterApp');
console.log('Firebase app initialized:', newsletterApp.name);  // Loggar appnamnet för att verifiera att Firebase initialiseras korrekt

// Hämta Firestore-databasreferensen
const db = getFirestore(newsletterApp);
console.log('Firestore initialized:', db);  // Loggar Firestore-instansen för att verifiera åtkomst till Firestore

export { db };
