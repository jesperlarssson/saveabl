"use client";

import React from "react";
import { useLang } from "@/hooks/useLang";
import Title from "@/components/ui/Title";
import BodyText from "@/components/ui/BodyText";

const BloggClient = () => {
  const { text } = useLang(); // Använd useLang för att få språkdata

  if (!text || !text.blog) {
    console.error("Language text is not defined properly");
    return null; // Kan också returnera en fallback UI
  }

  return (
    <div className="flex flex-col items-center border-b border-primary pb-8">
      <Title>{text.blog.title}</Title>
      <BodyText>{text.blog.description}</BodyText>
    </div>
  );
};

export default BloggClient;
