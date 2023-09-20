"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import useAuthModal from "@/hooks/useAuthModal";
import { useAuth } from "@/hooks/useAuth";
import Modal from "@/components/ui/Modal";
import { toast } from "react-hot-toast";
import SignInForm from "../general/SignInForm";
import SignUpForm from "../general/SignUpForm";

const AuthModal = () => {
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();
  const [signInOpen, setSignInOpen] = useState<boolean>(true);
  const auth = useAuth();




  if (!auth) {
    return null;
  }

  const { user, signUp, signIn } = auth;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [user]);

  const handleSignIn = async () => {
    try {
      const user = await signIn("test@email.com", "123456");
      toast.success(`Welcome ${user.uid}`);
      router.push("/mina-sidor");
      onClose();
    } catch (error) {
      toast.error(`Failed to sign in`);
    }
  };

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const toggleForm = () => {
    setSignInOpen(!signInOpen);
  };


  return (
    <Modal
      title={signInOpen ? "Logga in" : "Registrera dig"}
      description={
        signInOpen
          ? "Logga in för att hantera ditt konto."
          : "Registrera dig för att skapa ett konto."
      }
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col w-full gap-4">
        {signInOpen ? <SignInForm /> : <SignUpForm />}
        <p className="mt-4 text-sm text-gray-500 sm:mt-0 w-full text-center">
          {signInOpen ? "Saknar du konto?" : "Har du ett konto?"}
          <a
            onClick={toggleForm}
            className="text-accent underline cursor-pointer"
          >
            {signInOpen ? "Skapa konto." : "Logga in."}
          </a>
        </p>
      </div>
    </Modal>
  );
};
export default AuthModal;
