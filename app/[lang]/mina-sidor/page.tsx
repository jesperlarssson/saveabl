"use client";
import { redirect } from "next/navigation";

import SignOutButton from "@/components/SignOutButton";
import { useAuth } from "@/hooks/useAuth";

const MinaSidor = () => {
  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const { user } = auth;

  if (!user) {
    redirect("/logga-in");
  }

  return (
    <div>
      <SignOutButton />
    </div>
  );
};

export default MinaSidor;
