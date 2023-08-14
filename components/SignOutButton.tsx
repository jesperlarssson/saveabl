"use client";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import { useAuth } from "@/hooks/useAuth";


const SignOutButton = () => {
  const router = useRouter();
  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const { signOut } = auth;



  const handleSignOut = async () => {
    // const { error } = await supabaseClient.auth.signOut();

    // router.push("/");

    // if (error) {
    //   toast.error(error.message);
    // } else {
    //   toast.success("Logout successful");
    // }
    try {
      await signOut();
      toast.success("Du är nu utloggad");
      router.push("/");
    } catch (error) {
      toast.error("Något gick fel");
    }
  };

  return (
    <Button
      onClick={() => {
        handleSignOut();
      }}
    >
      Logga ut
    </Button>
  );
};

export default SignOutButton;
