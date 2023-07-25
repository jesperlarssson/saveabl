"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { navigation } from "@/lib/navigation";
import NavItem from "./NavItem";
import useAuthModal from "@/hooks/useAuthModal";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";

const Navbar = () => {
  const authModal = useAuthModal();
  const [active, setActive] = useState(false);
  const pathname = usePathname();

  const { user } = useUser();

  // const auth = useAuth();
  // if (!auth) {
  //   return null;
  // }

  // const { user } = auth;

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <div
        className={twMerge(
          `sticky top-0 w-full bg-primary-200 border-b border-primary border-opacity-25 drop-shadow-sm  z-30 transition`,
          active && ""
        )}
      >
        <nav className="w-full  flex items-center justify-between max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-8">
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
              className="hidden md:flex px-8 py-3 rounded-full bg-accent text-primary-200  text-sm font-poppins tracking-wider border border-transparent disabled:cursor-not-allowed disabled:opacity-50 hover:bg-accent-600 hover:drop-shadow-md transition"
            >
              Logga in
            </button>
          ) : (
            <div className="hidden md:flex items-center gap-x-4">
              <Link
                href="/mina-sidor"
                className=" px-8 py-3 rounded-full bg-primary text-primary-900  text-sm font-poppins tracking-wider border border-transparent disabled:cursor-not-allowed disabled:opacity-50 hover:bg-primary-500 hover:drop-shadow-md transition"
              >
                Mina Sidor
              </Link>
            </div>
          )}

          <div className="md:hidden mr-4">
            <button
              className="p-2 bg-primary bg-opacity-50 rounded-lg hover:drop-shadow-md "
              onClick={handleClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 fill-secondary"
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
            `flex flex-col fixed top-20 left-0 md:hidden h-screen w-screen opacity-0 bg-primary-200 transition duration-300 -translate-x-full`,
            active && "translate-x-0 opacity-100"
          )}
        >
          <ul className="">
            {navigation.map((item) => (
              <li key={item.id}>
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
                  href={item.path}
                  disabled={item.disabled}
                >
                  {item.name}
                </NavItem>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
