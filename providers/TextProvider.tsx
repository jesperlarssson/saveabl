"use client";

import React, { useEffect, useState, createContext, ReactNode } from "react";
import { useRouter } from "next/router";
import { getDictionary } from "@/lib/dictionary";

interface TextContextInterface {
  text: any;
}

export const TextContext = createContext<TextContextInterface>({
  text: null,
});

interface TextProviderProps {
  children: ReactNode;
}

export const TextProvider = ({ children }: TextProviderProps) => {
  const [text, setText] = useState({
    about_us: {
      title: "",
      description: "",
      image: "",
    },
  });
  const router = useRouter();
  const locale = router.query.locale;
  const defaultLocale = router.defaultLocale;

  console.log("locale", locale);
  console.log("defaultLocale", defaultLocale);

  const value = {
    text,
  };

  return <TextContext.Provider value={value}>{children}</TextContext.Provider>;
};
