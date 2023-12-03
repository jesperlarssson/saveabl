"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import useAuthModal from "@/hooks/useAuthModal";
import { useAuth } from "@/hooks/useAuth";
import Modal from "@/components/ui/Modal";
import { toast } from "react-hot-toast";
import SignInForm from "../general/SignInForm";
import SignUpForm from "../general/SignUpForm";
import { useLang } from "@/hooks/useLang";

const AuthModal = () => {
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();
  const [signInOpen, setSignInOpen] = useState<boolean>(true);
  const auth = useAuth();

  const { text } = useLang();

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
      title={signInOpen ? text.auth.title1 : text.auth.title2}
      description={signInOpen ? text.auth.description : text.auth.description2}
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col w-full gap-4">
        {signInOpen ? <SignInForm /> : <SignUpForm />}
        <p className="mt-4 text-sm text-gray-500 sm:mt-0 w-full text-center">
          {signInOpen ? text.auth.missing_account : text.auth.has_account}
          <a
            onClick={toggleForm}
            className="text-accent underline cursor-pointer"
          >
            {signInOpen ? text.auth.title2 : text.auth.title1}
          </a>
        </p>
      </div>
    </Modal>
  );
};
export default AuthModal;
