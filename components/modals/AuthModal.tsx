"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import useAuthModal from "@/hooks/useAuthModal";
import { useAuth } from "@/hooks/useAuth";
import Modal from "@/components/ui/Modal";
import { toast } from "react-hot-toast";
import Button from "../ui/Button";
import { on } from "events";
import SignInForm from "../general/SignInForm";

const AuthModal = () => {
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();
  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const { user, signUp, signIn } = auth;

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

  const handleSignUp = async () => {
    try {
      const user = await signUp("test2@email.com", "123456");
      toast.success(`Welcome ${user.uid}`);
    } catch (error) {
      toast.error(`Failed to sign up`);
    }
  };

  const handleCheckUser = () => {
    if (user) {
      toast.success(`Welcome ${user.uid}`);
    } else {
      toast.error(`Failed to sign in`);
    }
  };

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Logga in"
      description="Logga in för att hantera ditt konto."
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col w-full gap-4">
        <SignInForm />
        {/* <Button
            onClick={() => {
                handleSignIn();
            }}
        >
            Sign in
        </Button>

        <Button
          onClick={() => {
            handleSignUp();
          }}
        >
          Sign up
        </Button>
        <Button
          onClick={() => {
            handleCheckUser();
          }}
        >
          Status
        </Button> */}
      </div>
    </Modal>
  );
};
export default AuthModal;
