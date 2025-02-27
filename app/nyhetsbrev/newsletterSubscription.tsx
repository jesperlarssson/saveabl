"use client";
import { useState } from "react";
import { db } from "@/firebase/firebaseNewsletterConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import { useLang } from "@/hooks/useLang";
import { FiMail } from "react-icons/fi"; // Mejlikonen

const NewsletterSubscription = () => {
  const { lang, text } = useLang();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(""); // Hanterar land

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    
    if (!email) {
      setError(text.footer_newsletter.error_message);
      return;
    }
    if (!selectedCountry) {
      setError(text.footer_newsletter.select_country_error); // Validering: land måste väljas
      return;
    }


    try {
        await setDoc(doc(db, "newsletter", email), {
          "Namn": "",  // Eftersom vi inte samlar in namn, skickar vi en tom sträng
          "Mejl": email,
          "Land": selectedCountry,
          timestamp: new Date().toISOString(),
        });
        setSubmitted(true);
        setEmail("");
        setSelectedCountry(""); // Återställ val
        setError("");
      } catch (error) {
        setError(text.footer_newsletter.error_message);
      }
      
  };

  return (
    <div className="text-center md:text-left mt-10 md:mt-0">
      {/* Titel */}
      <h3 className="text-xl font-bold text-[#FCF7E8]">
        {text.footer_newsletter.title}
      </h3>

      {/* Formulär */}
      <form onSubmit={handleSubmit} className="mt-4 relative">
        <div className="flex items-center border-b border-[#FCF7E8] pb-2 w-[320px] sm:w-[400px]">
          {/* Inputfält */}
          <input
            type="email"
            placeholder={text.footer_newsletter.placeholder}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsTyping(e.target.value.length > 0);
            }}
            className="w-full text-[#FCF7E8] bg-transparent outline-none text-md placeholder-[#FCF7E8]"
            required
          />

          {/* Ikon/Knapp */}
          {isTyping ? (
            <button type="submit" className="ml-2 text-[#FCF7E8] font-bold">
              {text.footer_newsletter.subscribe_button}
            </button>
          ) : (
            <FiMail className="text-[#FCF7E8] text-2xl ml-2" />
          )}
        </div>

        {/* Landval visas bara om användaren börjar skriva */}
        {isTyping && (
          <div className="mt-4">
            <p className="text-[#FCF7E8] text-left font-bold">
              {text.footer_newsletter.country_label}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="country"
                  value="Sverige"
                  checked={selectedCountry === "Sverige"}
                  onChange={() => setSelectedCountry("Sverige")}
                  className="w-4 h-4 accent-[#FCF7E8] cursor-pointer"
                />
                <span className="text-[#FCF7E8]">
                  {text.footer_newsletter.sweden}
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="country"
                  value="Danmark"
                  checked={selectedCountry === "Danmark"}
                  onChange={() => setSelectedCountry("Danmark")}
                  className="w-4 h-4 accent-[#FCF7E8] cursor-pointer"
                />
                <span className="text-[#FCF7E8]">
                  {text.footer_newsletter.denmark}
                </span>
              </label>
            </div>
          </div>
        )}
      </form>

      {/* Beskrivande text */}
      <p className="text-center md:text-left text-sm text-[#FCF7E8] mt-2 w-[320px] sm:w-[400px]">
        {text.footer_newsletter.description}
      </p>

      {/* Felmeddelande */}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      {/* Bekräftelsemeddelande */}
      {submitted && (
        <p className="mt-4 text-sm text-[#6E2936] bg-[#FCF7E8] px-4 py-2 rounded-md w-fit mx-auto sm:mx-0">

          {text.footer_newsletter.thank_you_message}
        </p>
      )}
    </div>
  );
};

export default NewsletterSubscription;
