"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";
import { useLang } from "@/hooks/useLang";

const SignInForm = () => {
  const { onClose, isOpen } = useAuthModal();

  const [email, setEmail] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const auth = useAuth();
  const router = useRouter();
  const { text } = useLang();
  if (!auth) {
    return null;
  }

  const { signIn } = auth;

  const onSubmit = async (data: any) => {
    try {
      await signIn(data.email, data.password);
      toast.success(text.auth.logged_in);
      router.push("/mina-sidor");
      onClose();
    } catch (error: any) {
      toast.error(text.auth.login_failed);
    }
  };

  const onForgotPassword = () => {
    if (!email) {
      toast.error(text.auth.email_required);
      return;
    }
    try {
      auth.forgotPassword(email);
      toast.success(text.auth.reset_email_sent);
    } catch (error: any) {
      toast.error(text.auth.reset_email_failed);
    }
  };

  return (
    <form
      action="#"
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register("email", { required: true })}
        type="email"
        id="Email"
        onChange={(e) => setEmail(e.target.value)}
        label={text.auth.email}
        error={errors.email}
      />

      <Input
        label={text.auth.password}
        {...register("password", { required: true })}
        type="password"
        id="Password"
        error={errors.password}
      />

      <a className="underline text-gray-700 w-full flex justify-end cursor-pointer text-sm" onClick={onForgotPassword}>Glömt lösenord?</a>
    
      <Button
        type="submit"
        className="inline-block shrink-0 w-56 px-12 py-3 text-sm font-medium  transition focus:outline-none focus:ring "
      >
        {text.auth.button}
      </Button>
    </form>
  );
};

export default SignInForm;
