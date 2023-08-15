"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      if (data.password !== data.password_confirmation) {
        alert("Passwords do not match!");
        return;
      }
      toast.success("Should workey workey!");
      //await signUpWithEmailAndPassword(data.email, data.password);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <Section className="pt-10">
      <Card className="max-w-fit m-auto">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:px-16 lg:py-12">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className=" text-2xl font-poppins text-primary sm:text-3xl md:text-6xl">
              Mina sidor
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Med ett konto kan du hantera din prenumeration hos oss och se dina
              ordrar.
            </p>

            <form
              action="#"
              className="mt-8 grid grid-cols-6 gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Förnamn
                </label>
                <input
                  {...register("first_name", { required: true })}
                  type="text"
                  id="FirstName"
                  className="mt-1 h-8 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                {errors.first_name && <span>This field is required</span>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Efternamn
                </label>

                <input
                  {...register("last_name", { required: true })}
                  type="text"
                  id="LastName"
                  className="mt-1 h-8 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                {errors.last_name && <span>This field is required</span>}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block  text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  {...register("email", { required: true })}
                  type="email"
                  id="Email"
                  className="mt-1 h-8 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                {errors.email && <span>This field is required</span>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lösenord
                </label>

                <input
                  {...register("password", { required: true })}
                  type="password"
                  id="Password"
                  className="mt-1 h-8 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                {errors.password && <span>This field is required</span>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bekräfta lösenord
                </label>

                <input
                  {...register("password_confirmation", { required: true })}
                  type="password"
                  id="PasswordConfirmation"
                  className="mt-1 h-8 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                {errors.password_confirmation && (
                  <span>This field is required</span>
                )}
              </div>

              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    {...register("marketing_accept")}
                    type="checkbox"
                    id="MarketingAccept"
                    className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    Jag godkänner att ni skickar mig veckans recept och
                    marknadsföring via email.
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

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Har du ett konto?
                  <a href="#" className="text-accent underline">
                    Logga in
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </Card>
    </Section>
  );
};

export default SignIn;
