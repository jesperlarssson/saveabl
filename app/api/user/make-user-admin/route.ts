import { db, auth } from "@/firebase/firebaseAdmin";

const uid = "FdAqaM7v8HWvD3H3F4EIl7XiPJD3";

export async function POST(request: Request) {
    try {
      // Fetch user for testing
      const user = await auth.getUser(uid);
      console.log('Successfully fetched user data:', user.toJSON());
  
      // Set custom claim
      await auth.setCustomUserClaims(uid, { role: "admin" });
      console.log("User set as admin");
      return new Response(JSON.stringify({ status: "success" }));
    } catch (error) {
      console.log("Error:", error);
      return new Response(JSON.stringify({ status: "error", error }));
    }
  }
  