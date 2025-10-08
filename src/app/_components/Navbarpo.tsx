"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { TiThMenu } from "react-icons/ti";
import { IoIosCloseCircle } from "react-icons/io";
import DarkModeToggle from "./DarkModeToggle"; // Import komponen baru

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === "true") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="fixed w-full z-50 flex justify-between items-center px-6 font-bold lg:px-20 py-4 bg-black/20 backdrop-blur-lg text-black dark:text-white">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/logogreen.jpg"
          className="rounded-full"
          alt="Logo"
          width={50}
          height={50}
        />
      </div>

      {/* Desktop Navigation + Dark Toggle */}
      <div className="hidden md:flex items-center space-x-6">
        <nav className="flex items-center space-x-6">
          <Link href="/" className="hover:text-green-400">
            Beranda
          </Link>
          <Link href="/portofolio" className="hover:text-green-400">
            Portofolio
          </Link>
          <Link
            href="https://undangin.jokindess.com/"
            className="hover:text-green-400"
          >
            Undangan Digital
          </Link>
        </nav>
        <DarkModeToggle />
      </div>

      {/* Mobile Toggle + Dark Mode Button */}
      <div className="flex md:hidden items-center space-x-3">
        <DarkModeToggle />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? <IoIosCloseCircle size={28} /> : <TiThMenu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <nav
        className={`md:hidden absolute text-white top-[70px] left-0 w-full bg-[#0a2615] z-40 flex flex-col items-start space-y-4 px-6 py-4 text-left transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <Link href="/" className="hover:text-green-400 w-full">
          Beranda
        </Link>
        <Link href="/portofolio" className="hover:text-green-400">
          Portofolio
        </Link>
        <Link
          href="https://undangin.jokindess.com/"
          className="hover:text-green-400"
        >
          Undangan Digital
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
