"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { navigation } from "@/lib/navigation";
import NavItem from "./NavItem";
import useAuthModal from "@/hooks/useAuthModal";
import { useAuth } from "@/hooks/useAuth";
import Button from "./Button";

const Navbar = () => {
  const authModal = useAuthModal();
  const [active, setActive] = useState(false);
  const pathname = usePathname();

  const auth = useAuth();
  if (!auth) {
    return null;
  }

  const { user } = auth;

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="sticky top-0 w-full bg-primary-200 border-b border-primary border-opacity-25 drop-shadow-sm  z-30">
      <nav className="w-full  flex items-center justify-between max-w-screen-xl mx-auto px-2 sm:px-4 md:px-8">
        <Link
          href={"/"}
          className=" px-4 h-20 flex items-center rounded-md hover:shadow-inner hover:scale-95 transition-all"
        >
          <Image
            className="object-contain"
            width={100}
            height={20}
            alt="Saveabl home"
            src={"/svg/logo.svg"}
          />
        </Link>
        <ul className="flex">
          {navigation.map((item) => (
            <li key={item.id}>
              <NavItem
                className={twMerge(
                  `px-8 h-20 flex items-center hover:bg-primary hover:shadow-inner bg-opacity-60 `,
                  [
                    pathname === item.path && "bg-primary",
                    item.disabled &&
                      "cursor-not-allowed opacity-50 hover:bg-primary-200",
                  ]
                )}
                active={pathname === item.path}
                href={item.path}
                disabled={item.disabled}
              >
                {item.name}
              </NavItem>
            </li>
          ))}
        </ul>
        {!user ? (
          <button
            onClick={authModal.onOpen}
            className=" px-8 py-3 rounded-full bg-accent text-primary-200  text-sm font-poppins tracking-wider border border-transparent disabled:cursor-not-allowed disabled:opacity-50 hover:bg-accent-600 hover:drop-shadow-md transition"
          >
            Logga in
          </button>
        ) : (
          <div className="flex items-center gap-x-4">
            <Link
              href="/mina-sidor"
              className=" px-8 py-3 rounded-full bg-primary text-primary-900  text-sm font-poppins tracking-wider border border-transparent disabled:cursor-not-allowed disabled:opacity-50 hover:bg-primary-500 hover:drop-shadow-md transition"
            >
              Mina Sidor
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
