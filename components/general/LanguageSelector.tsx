import React from "react";
import { useLang } from "@/hooks/useLang"; // Adjust the path to your hook

const LanguageSelector: React.FC = () => {
  const { lang, handleChangeLang } = useLang();

  return (
    <select
      className="bg-primary-200 border border-secondary  text-secondary rounded-full px-4 py-2 font-poppins tracking-wider hover:bg-primary-300 transition appearance-none text-lg"
      value={lang}
      onChange={(e) => handleChangeLang(e.target.value as any)}
    >
      <option value="sv">🇸🇪</option>
      <option value="en">🇬🇧</option>
    </select>
  );
};

export default LanguageSelector;
