"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

import { navigation } from "@/lib/navigation";
import NavItem from "./NavItem";
import Image from "next/image";

const Navbar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="fixed top-0 w-full z-50">
      <nav className="w-full py-6 flex justify-between max-w-screen-xl mx-auto px-2 sm:px-4 md:px-8">
        <div className="logo">
          <Image className="object-contain" width={100} height={20} alt="Saveabl home" src={"/svg/logo.svg"} />
        </div>
        <ul className="flex gap-x-4">
          {navigation.map((item) => (
            <li key={item.id}>
              <NavItem active={false} href={item.path}>
                {item.name}
              </NavItem>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
