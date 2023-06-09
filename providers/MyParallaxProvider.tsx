"use client";

import { ParallaxProvider } from "react-scroll-parallax";

interface MyParallaxProviderProps {
  children: React.ReactNode;
}

const MyParallaxProvider: React.FC<MyParallaxProviderProps> = ({
  children,
}) => {
  return <ParallaxProvider>{children}</ParallaxProvider>;
};

export default MyParallaxProvider;
