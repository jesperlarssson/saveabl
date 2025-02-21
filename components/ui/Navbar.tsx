"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import NavItem from "./NavItem";
import useAuthModal from "@/hooks/useAuthModal";
import { useAuth } from "@/hooks/useAuth";
import LanguageSelector from "../general/LanguageSelector";
import { useLang } from "@/hooks/useLang";

const Navbar = () => {
  const authModal = useAuthModal();
  const [active, setActive] = useState(false);
  const pathname = usePathname();

  const { text } = useLang();

  const navLinkFaqClass = "ml-[-10px]";

  const handleScrollToFAQ = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const faqSection = document.getElementById("vanliga-fragor");
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  

  interface NavigationItem {
    id: number;
    name: string;
    path?: string; 
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void; 
    disabled?: boolean;
  }
  

  const navigation: NavigationItem[] = [
    {
      id: 1,
      name: text.nav.order,
      path: "/bestall",
      disabled: false,
    },
    {
      id: 2,
      name: text.nav.recipe,
      path: "/recept",
      disabled: false,
    },
    {
      id: 3,
      name: text.nav.about,
      path: "/om-oss",
      disabled: false,
    },
    {
      id: 5,
      name: text.nav.giftcard, 
      path: "/presentkort", 
      disabled: false,
    },
    {
      id: 6,
      name: text.nav.faq,
      path: "#vanliga-fragor",
      onClick: (e) => {
        e.preventDefault();
        setActive(false); 
    
        setTimeout(() => {
          requestAnimationFrame(() => {
            const faqSection = document.getElementById("vanliga-fragor");
    
            if (faqSection) {
              window.location.hash = "vanliga-fragor"; 
              faqSection.scrollIntoView({ behavior: "smooth", block: "start" });
    
              setTimeout(() => {
                window.scrollTo({ top: faqSection.offsetTop - 50, behavior: "smooth" });
              }, 100);
            }
          });
        }, 300); 
      },
      disabled: false,
    },
    
  ];

  const auth = useAuth();
  if (!auth) {
    return null;
  }

  const { user } = auth;

  const handleClick = () => {
    setActive(!active);
  };


  return (
    <div
      className={twMerge(
        `sticky top-0 w-full bg-primary-200 border-b border-primary border-opacity-25 drop-shadow-sm  z-30 transition`,
        active && ""
      )}
    >
      <nav className="w-full flex items-center justify-between max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-8">
        <Link
          href={"/"}
          className=" px-4 h-14 flex items-center rounded-md hover:shadow-inner hover:scale-95 transition-all"
        >
          <Image
            className="object-contain"
            width={90}
            height={18}
            alt="Saveabl home"
            src={"/svg/logo.svg"}
          />
        </Link>
        <ul className="hidden md:flex">
  {navigation.map((item) => (
    <li key={item.id}>
      <NavItem
        className={twMerge(
          `px-8 h-14 flex items-center hover:bg-primary hover:shadow-inner bg-opacity-60 `,
          [
            pathname === item.path && "bg-primary",
            item.disabled && "cursor-not-allowed opacity-50 hover:bg-primary-200",
          ]
        )}
        active={pathname === item.path}
        href={item.path || "#"} 
        disabled={item.disabled}
        onClick={item.onClick} 
      >
        {item.name}
      </NavItem>
    </li>
  ))}
</ul>


        <div className="hidden md:flex gap-2">
          <LanguageSelector />

          {!user ? (
            <button
              onClick={authModal.onOpen}
              className="hidden md:flex px-8 py-3 rounded-full bg-accent text-primary-200 text-sm font-poppins tracking-wider border border-transparent disabled:cursor-not-allowed disabled:opacity-50 hover:bg-accent-600 hover:drop-shadow-md transition"
            >
              {text.nav.log_in}
            </button>
          ) : (
            <div className="hidden md:flex items-center gap-x-4">
              <Link
                href="/mina-sidor"
                onClick={() => setActive(false)}
                className=" px-8 py-3 rounded-full bg-primary text-primary-900 text-sm font-poppins tracking-wider border border-transparent disabled:cursor-not-allowed disabled:opacity-50 hover:bg-primary-500 hover:drop-shadow-md transition"
              >
                {text.nav.my_account}
              </Link>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button
            className="p-2 bg-transparent bg-opacity-50 rounded-lg hover:drop-shadow-md "
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="#6E2936"  // Ändra färgen
              className="h-7 w-7 fill-none"
            >
              {active ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={twMerge(
          `flex flex-col fixed top-0 left-0 md:hidden h-[calc(100vh+2rem)] w-screen opacity-0 bg-primary-200 transition duration-300 -translate-x-full`,
          active && "translate-x-0 opacity-100"
        )}
      >
        <button
          className="absolute top-[-4px] right-4 p-4 text-5xl text-[#EECFAA] hover:text-opacity-75"
          onClick={handleClick}
        >
          &times;
        </button>

        <li className="mt-12 mb-6 flex justify-center md:hidden">
  <div className="p-3 rounded-full">
    <LanguageSelector />
  </div>
</li>


<ul className="flex flex-col items-center">
          {navigation.map((item) => (
            <li onClick={() => setActive(false)} key={item.id}>
              <NavItem
                className={twMerge(
                  `-translate-x-full px-8 h-14 flex items-center text-xl font-bold hover:bg-primary hover:shadow-inner bg-opacity-60 transition duration-600`,
                  [
                    pathname === item.path && "bg-primary",
                    item.disabled &&
                      "cursor-not-allowed opacity-50 hover:bg-primary-200",
                    active && "translate-x-0",
                  ]
                )}
                active={pathname === item.path}
                href={item.path || "#"}
                disabled={item.disabled}
              >
                {item.name}
              </NavItem>
            </li>
          ))}
          {!user ? (
            <button
              onClick={authModal.onOpen}
              className="flex md:hidden mx-4 mt-8 justify-center w-40 px-8 py-3 rounded-full bg-accent text-primary-200 text-sm font-poppins tracking-wider border border-transparent disabled:cursor-not-allowed disabled:opacity-50 hover:bg-accent-600 hover:drop-shadow-md transition"
            >
              {text.nav.log_in}
            </button>
          ) : (
            <div className="flex md:hidden items-center gap-x-4">
              <Link
                href="/mina-sidor"
                onClick={() => setActive(false)}
                className="px-8 py-3 mx-4 mt-8 w-40 flex items-center justify-center rounded-full bg-primary text-primary-900 text-sm font-poppins tracking-wider border border-transparent disabled:cursor-not-allowed disabled:opacity-50 hover:bg-primary-500 hover:drop-shadow-md transition"
              >
                {text.nav.my_account}
              </Link>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
