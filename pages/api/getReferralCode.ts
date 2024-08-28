import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/firebase/firebaseAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = req.query;

  if (!uid || typeof uid !== "string") {
    return res.status(400).json({ error: "Invalid UID" });
  }

  try {
    const userDocRef = db.collection("referralCodes").doc(uid);
    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      res.status(200).json({ referralCode: userData?.referralCode || null });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error getting document:", error);
    res.status(500).json({ error: "Failed to get referral code" });
  }
}
