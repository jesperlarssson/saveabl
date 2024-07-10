
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

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
