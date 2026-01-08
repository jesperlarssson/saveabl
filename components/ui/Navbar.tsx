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
import { useCart } from "@/providers/CartContext";
import CartPreview from "@/components/modals/CartPreview";

const Navbar = () => {
  const authModal = useAuthModal();
  const [active, setActive] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const pathname = usePathname();
  const { text } = useLang();
  const { items } = useCart();

  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  interface NavigationItem {
    id: number;
    name: string;
    path?: string;
    onClick?: (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => void;
    disabled?: boolean;
  }

  const navigation: NavigationItem[] = [
    { id: 1, name: text.nav.order, path: "/bestall" },
    { id: 2, name: text.nav.recipe, path: "/recept" },
    { id: 3, name: text.nav.about, path: "/om-oss" },

    // Vanliga frågor (flyttad till presentkort-platsen)
    {
      id: 5,
      name: text.nav.faq,
      path: "/#vanliga-fragor",
      onClick: (e) => {
        e.preventDefault();
        setActive(false);

        if (pathname !== "/") {
          window.location.href = "/#vanliga-fragor";
        } else {
          setTimeout(() => {
            const el = document.getElementById("vanliga-fragor");
            if (!el) return;
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            setTimeout(() => {
              window.scrollTo({
                top: el.offsetTop - 50,
                behavior: "smooth",
              });
            }, 120);
          }, 250);
        }
      },
    },

    // Ny länk: Gårdsbutik
    {
      id: 6,
      name: text.nav.farmshop ?? "Gårdsbutik",
      path: "/gardsbutik",
    },
  ];

  const auth = useAuth();
  if (!auth) return null;
  const { user } = auth;

  const handleCartClick = () => setShowCart(true);

  return (
    <>
      <div
        id="site-header"
        className="
          fixed top-0 left-0 right-0 z-50
          bg-primary-200 border-b border-primary/25 drop-shadow-sm
        "
      >
        {/* NAVBAR RAD */}
        <nav
          className="
            w-full h-16
            flex items-stretch justify-between
            px-4 md:px-8 2xl:px-10
          "
        >
          {/* Logo */}
          <Link
            href="/"
            className="
              h-full px-3
              flex items-center
              rounded-md
              hover:shadow-inner hover:scale-95
              transition-all
              outline-none
              focus-visible:ring-2
              focus-visible:ring-[#6E2936]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-primary-200
            "
          >
            <Image
              src="/svg/logo.svg"
              alt="Saveabl home"
              width={90}
              height={18}
              className="object-contain"
            />
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden md:flex h-full">
            {navigation.map((item) => (
              <li key={item.id} className="h-full">
                <NavItem
                  className={twMerge(
                    `
                      h-full px-8
                      flex items-center
                      hover:bg-primary hover:shadow-inner
                      transition
                    `,
                    pathname === item.path && "bg-primary",
                    item.disabled && "cursor-not-allowed opacity-50"
                  )}
                  active={pathname === item.path}
                  href={item.path ?? "#"}
                  disabled={item.disabled}
                  onClick={item.onClick}
                >
                  {item.name}
                </NavItem>
              </li>
            ))}
          </ul>

          {/* Right side desktop */}
          <div className="hidden md:flex h-full gap-4 items-center">
            <LanguageSelector />

            {/* Cart */}
            <button
              onClick={handleCartClick}
              className="relative flex items-center justify-center p-2 hover:opacity-80 transition"
              aria-label="Varukorg"
            >
              <Image src="/icons/cart.svg" alt="Cart" width={26} height={26} />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6E2936] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </button>

            {/* Auth */}
            {!user ? (
              <button
                onClick={authModal.onOpen}
                className="px-8 py-2.5 rounded-full bg-accent text-primary-200 text-sm tracking-wider hover:bg-accent-600 transition"
              >
                {text.nav.log_in}
              </button>
            ) : (
              <Link
                href="/mina-sidor"
                className="px-8 py-2.5 rounded-full bg-primary text-primary-900 text-sm tracking-wider hover:bg-primary-500 transition"
              >
                {text.nav.my_account}
              </Link>
            )}
          </div>

          {/* Mobile right side */}
          <div className="md:hidden flex items-center gap-1 mr-2">
            <button
              onClick={handleCartClick}
              className="relative flex items-center justify-center p-2"
              aria-label="Varukorg"
            >
              <Image src="/icons/cart.svg" alt="Cart" width={24} height={24} />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6E2936] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </button>

            <button
              className="p-2 rounded-lg"
              onClick={() => setActive(!active)}
              aria-label="Öppna meny"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="#6E2936"
                className="h-7 w-7"
                fill="none"
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

        {/* Mobile menu */}
        <div
          className={twMerge(
            `
              md:hidden fixed top-0 left-0 w-screen
              h-[calc(100vh+2rem)]
              bg-primary-200
              opacity-0 -translate-x-full
              transition duration-300
            `,
            active && "translate-x-0 opacity-100"
          )}
        >
          <button
            className="absolute top-[-4px] right-4 p-4 text-5xl text-[#EECFAA]"
            onClick={() => setActive(false)}
          >
            &times;
          </button>

          <li className="mt-12 mb-4 flex justify-center">
            <LanguageSelector />
          </li>

          <ul className="flex flex-col w-full items-center text-center">
            {navigation.map((item) => (
              <li
                key={item.id}
                onClick={() => setActive(false)}
                className="w-full"
              >
                <NavItem
                  className={twMerge(
                    `
                      block w-full px-8 py-4
                      flex justify-center items-center
                      text-xl font-bold
                      hover:bg-primary transition
                    `,
                    pathname === item.path && "bg-primary",
                    item.disabled && "opacity-50"
                  )}
                  active={pathname === item.path}
                  href={item.path ?? "#"}
                  disabled={item.disabled}
                >
                  {item.name}
                </NavItem>
              </li>
            ))}

            {!user ? (
              <button
                onClick={authModal.onOpen}
                className="mx-4 mt-8 w-40 px-8 py-3 rounded-full bg-accent text-primary-200 text-sm hover:bg-accent-600 transition"
              >
                {text.nav.log_in}
              </button>
            ) : (
              <Link
                href="/mina-sidor"
                onClick={() => setActive(false)}
                className="mx-4 mt-8 w-40 px-8 py-3 rounded-full bg-primary text-primary-900 text-sm hover:bg-primary-500 transition"
              >
                {text.nav.my_account}
              </Link>
            )}
          </ul>
        </div>
      </div>

      {/* Cart modal */}
      <CartPreview open={showCart} onClose={() => setShowCart(false)} />
    </>
  );
};

export default Navbar;
