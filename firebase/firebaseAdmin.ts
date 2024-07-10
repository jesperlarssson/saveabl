
// utils/firebaseAdmin.js
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  if (
    !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    !process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL ||
    !process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY
  ) {
    throw new Error('Missing Firebase credentials');
  }

  const mainFirebaseConfig = {
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  };

  admin.initializeApp(mainFirebaseConfig, 'mainApp');

  if (
    !process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_PROJECT_ID ||
    !process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_CLIENT_EMAIL ||
    !process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_PRIVATE_KEY
  ) {
    throw new Error('Missing Newsletter Firebase credentials');
  }

  const newsletterFirebaseConfig = {
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_NEWSLETTER_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  };

  admin.initializeApp(newsletterFirebaseConfig, 'newsletterApp');
}

const mainDb = admin.firestore(admin.app('mainApp'));
const mainAuth = admin.auth(admin.app('mainApp'));

const newsletterDb = admin.firestore(admin.app('newsletterApp'));
const newsletterAuth = admin.auth(admin.app('newsletterApp'));

export { mainDb, mainAuth, newsletterDb, newsletterAuth };
