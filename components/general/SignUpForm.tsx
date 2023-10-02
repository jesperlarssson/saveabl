"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import Input from "../ui/Input";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const auth = useAuth();
  if (!auth) {
    return null;
  }

  const { signUp } = auth;

  const onSubmit = async (data: any) => {
    if (data.password !== data.password_confirmation) {
      toast.error("Lösenorden matchar inte!");
      return;
    }
    try {
      await signUp(data.email, data.password);
      toast.success("Ditt konto har skapats!");
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
        label="Email"
        {...register("email", { required: true })}
        type="email"
        id="Email"
        error={errors.email}
      />

      <Input
        label="Lösenord"
        {...register("password", { required: true })}
        type="password"
        id="Password"
        error={errors.password}
      />

      <Input
        label="Bekräfta lösenord"
        {...register("password_confirmation", { required: true })}
        type="password"
        id="PasswordConfirmation"
        error={errors.password_confirmation}
      />

      <div className="col-span-6">
        <label htmlFor="MarketingAccept" className="flex gap-4">
          <input
            {...register("marketing_accept")}
            type="checkbox"
            id="MarketingAccept"
            className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
          />

          <span className="text-sm text-gray-700">
            Jag godkänner att ni skickar mig veckans recept och marknadsföring
            via email.
          </span>
        </label>
      </div>

      <div className="col-span-6">
        <p className="text-sm text-gray-500">
          Genom att skapa ett konto godkänner du våra
          <a href="#" className="text-gray-700 underline">
            terms and conditions
          </a>
          och vår
          <a href="#" className="text-gray-700 underline">
            privacy policy
          </a>
          .
        </p>
      </div>

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <Button
          type="submit"
          className="inline-block shrink-0 w-56 px-12 py-3 text-sm font-medium  transition focus:outline-none focus:ring "
        >
          Skapa konto
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
