"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const { onClose, isOpen } = useAuthModal();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const auth = useAuth();
  const router = useRouter();
  if (!auth) {
    return null;
  }

  const { signIn } = auth;

  const onSubmit = async (data: any) => {
    try {
      await signIn(data.email, data.password);
      toast.success("Inloggad!");
      router.push("/mina-sidor");
      onClose();
    } catch (error: any) {
      toast.error("Inloggningen misslyckades!");
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
        label="E-post"
        error={errors.email}
      />

      <Input
        label="Lösenord"
        {...register("password", { required: true })}
        type="password"
        id="Password"
        error={errors.password}
      />

      <Button
        type="submit"
        className="inline-block shrink-0 w-56 px-12 py-3 text-sm font-medium  transition focus:outline-none focus:ring "
      >
        Logga in
      </Button>
    </form>
  );
};

export default SignInForm;
