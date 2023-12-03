"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import Input from "../ui/Input";
import { useRouter } from "next/navigation";
import { useLang } from "@/hooks/useLang";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { text } = useLang();

  const auth = useAuth();
  const router = useRouter();
  if (!auth) {
    return null;
  }

  const { signUp } = auth;

  const onSubmit = async (data: any) => {
    if (data.password !== data.password_confirmation) {
      toast.error(text.auth.password_no_match);
      return;
    }
    try {
      const res = await signUp(data.email, data.password);
      toast.success(text.auth.account_created);
      router.push("/mina-sidor");
    } catch (error: any) {
      toast.error("Account already exists!");
    }
  };

  return (
    <form
      action="#"
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label={text.auth.email}
        {...register("email", { required: true })}
        type="email"
        id="Email"
        error={errors.email}
      />

      <Input
        label={text.auth.password}
        {...register("password", { required: true })}
        type="password"
        id="Password"
        error={errors.password}
      />

      <Input
        label={text.auth.confirm_password}
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

          <span className="text-sm text-gray-700">{text.auth.terms}</span>
        </label>
      </div>

      <div className="col-span-6">
        <p className="text-sm text-gray-500">
          {text.auth.terms_and_conditions}
          <a href="#" className="text-gray-700 underline">
            {text.auth.privacy_policy}
          </a>
          {text.auth.privacy_policy2}
          <a href="#" className="text-gray-700 underline">
            {text.auth.privacy_policy3}
          </a>
          .
        </p>
      </div>

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <Button
          type="submit"
          className="inline-block shrink-0 w-56 px-12 py-3 text-sm font-medium  transition focus:outline-none focus:ring "
        >
          {text.auth.sign_up}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
