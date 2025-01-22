"use client";
import { useLang } from "@/hooks/useLang";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Section from "./Section";
import TextBanner from "../ui/TextBanner"; // Importera TextBanner
import { textBannerText } from "@/lib/general"; // Importera texten

const Footer = () => {
  const date = new Date();
  const { text, lang } = useLang();

  let trustpilotImage = "/images/trustpilot-en.png"; // Standardbild om inget språk matchar

  switch (lang) {
    case 'sv':
      trustpilotImage = "/images/trustpilot-sv.png";
      break;
    case 'da':
      trustpilotImage = "/images/trustpilot-da.png";
      break;
    case 'en':
    default:
      trustpilotImage = "/images/trustpilot-en.png";
      break;
  }

  return (
    <>
      <footer className="bg-secondary">
        {/* Lägg till TextBanner högst upp i footern */}
        <div className="mb-0">
            <TextBanner>{textBannerText}</TextBanner>
          </div>
        <Section className="mx-auto px-4 py-10 sm:px-6 lg:px-8">

          <div>
            <p className="mx-auto mt-0 mb-2 max-w-lg text-center leading-relaxed text-primary-200 text-lg sm:text-xl">
              {text.footer.questions}
            </p>
            <p className="mx-auto mb-2 max-w-lg text-center leading-relaxed text-primary-200 text-lg sm:text-xl">
              {text.footer.questions2}
            </p>
          </div>

          <div>
            <p className="mt-3 text-center hover:underline text-primary-200 text-lg sm:text-xl">
              <a href="mailto:hello@saveabl.se">hello@saveabl.se</a>
            </p>
          </div>

          <ul className="mt-6 flex justify-center gap-6 md:gap-8">
            <li className="h-14 w-14 drop-shadow-lg flex justify-center items-center transition bg-accent hover:bg-accent/75 text-white hover:text-white/75 rounded-full p-3">
              <a href="https://www.facebook.com/saveablfood/" rel="noreferrer" target="_blank">
                <span className="sr-only">Facebook</span>
                <FaFacebookF size={26} />
              </a>
            </li>
            <li className="h-14 w-14 drop-shadow-lg flex justify-center items-center transition bg-accent hover:bg-accent/75 text-white hover:text-white/75 rounded-full p-3">
              <a href="https://www.instagram.com/saveabl/" rel="noreferrer" target="_blank">
                <span className="sr-only">Instagram</span>
                <FaInstagram size={26} />
              </a>
            </li>
            <li className="h-14 w-14 drop-shadow-lg flex justify-center items-center transition bg-accent hover:bg-accent/75 text-white hover:text-white/75 rounded-full p-3">
              <a href="https://se.linkedin.com/company/saveabl" rel="noreferrer" target="_blank">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedinIn size={26} />
              </a>
            </li>
          </ul>

          <div className="flex justify-center mt-7 mb-1">
            <a href="https://se.trustpilot.com/review/saveabl.se" target="_blank" rel="noopener noreferrer">
              {/* Dynamisk Trustpilot-bild */}
              <img src={trustpilotImage} alt="Trustpilot" className="h-12 w-auto" />
            </a>
          </div>

          <div>
            <p className="mx-auto mt-6 mb-1 max-w-md text-center leading-relaxed hover:underline text-primary-200">
              <a href="https://www.saveabl.com/nyhetsbrev" target="_blank" rel="noopener noreferrer">
                {text.footer.newsletter}
              </a>
            </p>
          </div>

          <div>
            <p className="mx-auto mt-1 mb-1 max-w-md text-center leading-relaxed hover:underline text-primary-200">
              <a href="https://www.saveabl.com/villkor" target="_blank" rel="noopener noreferrer">
                {text.footer.terms}
              </a>
            </p>
          </div>

          <div>
            <p className="mx-auto mt-1 mb-2 max-w-md text-center leading-relaxed hover:underline text-primary-200">
              <a href="https://www.saveabl.com/villkor/integritetspolicy" target="_blank" rel="noopener noreferrer">
                {text.footer.integrity}
              </a>
            </p>
          </div>

          <p className="mx-auto mt-7 max-w-md text-center leading-relaxed text-primary-200">
            Övre Kaserngården 12, 415 27 Göteborg, Sweden, Org. number:
            559266-3149. VAT number: SE559266314901.
          </p>

          <div className="w-full mt-10 pt-10 border-t border-secondary-900 border-opacity-30">
            <div className="text-center text-primary opacity-50">
              <p>Copyright © {date.getFullYear()} Foody Impact AB</p>
            </div>
          </div>
        </Section>
      </footer>
    </>
  );
};

export default Footer;
