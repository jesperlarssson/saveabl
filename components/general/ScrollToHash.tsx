"use client";
import { useEffect } from "react";

const ScrollToHash = () => {
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      // Vänta tills DOM är redo
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return null;
};

export default ScrollToHash;
