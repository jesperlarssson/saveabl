"use client";
import { useLang } from "@/hooks/useLang";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Section from "./Section";
import TextBanner from "../ui/TextBanner"; // Importera TextBanner
import { textBannerText } from "@/lib/general"; // Importera texten
import NewsletterSubscription from "@/app/nyhetsbrev/newsletterSubscription";

const Footer = () => {
  const date = new Date();
  const { text, lang } = useLang();

  let trustpilotImage = "/images/trustpilot-en.webp"; // Standardbild om inget språk matchar

  switch (lang) {
    case "sv":
      trustpilotImage = "/images/trustpilot-sv.webp";
      break;
    case "da":
      trustpilotImage = "/images/trustpilot-da.webp";
      break;
    case "en":
    default:
      trustpilotImage = "/images/trustpilot-en.webp";
      break;
  }

  return (
    <footer className="bg-secondary">
      {/* Lägg till TextBanner högst upp i footern */}
      <div className="mb-0">
        <TextBanner>{textBannerText}</TextBanner>
      </div>

      <Section className="mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* FLEX-LAYOUT FÖR TVÅ KOLUMNER */}
        <div className="w-full mx-auto flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:justify-between gap-x-40 ml-0">
  
  {/* Vänster kolumn - Frågor */}
  <div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start ml-auto">
    <p className="mt-0 mb-1 leading-relaxed text-primary-200 text-xl sm:text-xl font-bold">
      {text.footer.questions}
    </p>
    <p className="mb-1 leading-relaxed text-primary-200 text-lg sm:text-xl">
      {text.footer.questions2}
    </p>
    <p className="hover:underline text-primary-200 text-lg sm:text-xl">
      <a href="mailto:hello@saveabl.se">hello@saveabl.se</a>
    </p>
    <p className="hover:underline text-primary-200 text-lg sm:text-xl">
      <a href="tel:+46730876207">073-087 62 07</a>
    </p>
  </div>
  {/* Sociala medier på mobil - Placeras före nyhetsbrevet i mobilvy */}
  <ul className="flex justify-center gap-4 md:hidden mt-10">
    <li className="h-12 w-12 drop-shadow-lg flex justify-center items-center transition bg-accent hover:bg-accent/75 text-white hover:text-white/75 rounded-full p-2">
      <a href="https://www.facebook.com/saveablfood/" rel="noreferrer" target="_blank">
        <span className="sr-only">Facebook</span>
        <FaFacebookF size={22} />
      </a>
    </li>
    <li className="h-12 w-12 drop-shadow-lg flex justify-center items-center transition bg-accent hover:bg-accent/75 text-white hover:text-white/75 rounded-full p-2">
      <a href="https://www.instagram.com/saveabl/" rel="noreferrer" target="_blank">
        <span className="sr-only">Instagram</span>
        <FaInstagram size={22} />
      </a>
    </li>
    <li className="h-12 w-12 drop-shadow-lg flex justify-center items-center transition bg-accent hover:bg-accent/75 text-white hover:text-white/75 rounded-full p-2">
      <a href="https://se.linkedin.com/company/saveabl" rel="noreferrer" target="_blank">
        <span className="sr-only">LinkedIn</span>
        <FaLinkedinIn size={22} />
      </a>
    </li>
  </ul>

  {/* Höger kolumn - Nyhetsbrev och sociala medier */}
  <div className="w-full md:w-1/2 flex flex-col self-start">
    <div className="w-full">
      <NewsletterSubscription />
    </div>

    {/* Sociala medier på dator */}
  <ul className="hidden md:flex justify-center md:justify-start gap-4 md:gap-6 mt-8">
    <li className="h-12 w-12 drop-shadow-lg flex justify-center items-center transition bg-accent hover:bg-accent/75 text-white hover:text-white/75 rounded-full p-2">
      <a href="https://www.facebook.com/saveablfood/" rel="noreferrer" target="_blank">
        <span className="sr-only">Facebook</span>
        <FaFacebookF size={22} />
      </a>
    </li>
    <li className="h-12 w-12 drop-shadow-lg flex justify-center items-center transition bg-accent hover:bg-accent/75 text-white hover:text-white/75 rounded-full p-2">
      <a href="https://www.instagram.com/saveabl/" rel="noreferrer" target="_blank">
        <span className="sr-only">Instagram</span>
        <FaInstagram size={22} />
      </a>
    </li>
    <li className="h-12 w-12 drop-shadow-lg flex justify-center items-center transition bg-accent hover:bg-accent/75 text-white hover:text-white/75 rounded-full p-2">
      <a href="https://se.linkedin.com/company/saveabl" rel="noreferrer" target="_blank">
        <span className="sr-only">LinkedIn</span>
        <FaLinkedinIn size={22} />
      </a>
    </li>
  </ul>
</div>
</div>


        {/* Trustpilot-bild */}
        <div className="flex justify-center mt-12 md:mt-16 mb-1">
          <a
            href="https://se.trustpilot.com/review/saveabl.se"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={trustpilotImage} alt="Trustpilot" className="h-12 w-auto" />
          </a>
        </div>

        {/* 🔹 Betalningsikoner */}
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-4 gap-px sm:gap-2 items-center justify-items-center w-auto sm:flex">
            <img src="/icons/klarna.svg" alt="Klarna" className="h-10 w-auto" />
            <img src="/icons/apple-pay.svg" alt="Apple Pay" className="h-6 w-auto" />
            <img src="/icons/google-pay.svg" alt="Google Pay" className="h-10 w-auto" />
            <img src="/icons/swish.svg" alt="Swish" className="h-8 w-auto" />
            <img src="/icons/mobilepay.svg" alt="MobilePay" className="h-8 w-auto ml-2 mr-2" />
            <img
              src="/icons/visa.svg"
              alt="Visa"
              className="h-4 w-auto bg-white p-1 rounded-xs"
            />
            <img src="/icons/mastercard.svg" alt="Mastercard" className="h-6 w-auto" />
            <img src="/icons/amex.svg" alt="American Express" className="h-8 w-auto" />
          </div>
        </div>


        {/* Länkar */}
        <div>
  <p className="mx-auto mt-10 mb-1 max-w-md text-center leading-relaxed hover:underline text-primary-200">
    <a href="/presentkort">
      {text.footer.giftcard}
    </a>
  </p>
</div>

        <div>
          <p className="mx-auto mt-1 mb-1 max-w-md text-center leading-relaxed hover:underline text-primary-200">
            <a
              href="/villkor"
              target="_blank"
              rel="noopener noreferrer"
            >
              {text.footer.terms}
            </a>
          </p>
        </div>

        <div>
          <p className="mx-auto mt-1 mb-2 max-w-md text-center leading-relaxed hover:underline text-primary-200">
            <a
              href="/villkor/integritetspolicy"
              target="_blank"
              rel="noopener noreferrer"
            >
              {text.footer.integrity}
            </a>
          </p>
        </div>

        {/* Copyright */}
        <div className="w-full mt-10 pt-10 border-t border-secondary-900 border-opacity-30">
          <div className="text-center text-primary opacity-50">
            <p>Copyright © {date.getFullYear()} Saveabl AB</p>
          </div>
          <div className="text-center text-primary opacity-50 mt-6">
  <p className="mx-auto max-w-md leading-relaxed">
    Övre Kaserngården 12, 415 27 Göteborg, Sweden, Org. number: 559266-3149. VAT
    number: SE559266314901.
  </p>
</div>

        </div>
      </Section>
    </footer>
  );
};

export default Footer;
