"use client";
import { useState } from "react";
import { db } from "@/firebase/firebaseNewsletterConfig";
import { doc, setDoc } from "firebase/firestore";
import { useLang } from "@/hooks/useLang";
import { FiMail } from "react-icons/fi";

const NewsletterSubscription = () => {
  const { lang, text } = useLang();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!email) {
      setError(text.footer_newsletter.error_message);
      return;
    }

    try {
      await setDoc(doc(db, "newsletter", email), {
        "Namn": "", // Vi samlar inte in namn
        "Mejl": email,
        "Land": "Sverige", // 🔹 Hårdkodat land
        timestamp: new Date().toISOString(),
      });

      setSubmitted(true);
      setEmail("");
      setIsTyping(false);
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
              setError("");
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
