"use client";

import React, { useState } from "react"; // Tambahkan React di sini
import Link from "next/link";
import Image from "next/image";
import { TiThMenu } from "react-icons/ti";
import { IoIosCloseCircle } from "react-icons/io";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="fixed w-full z-10 flex justify-between items-center p-6 bg-gelap text-white">
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          className="h-10 w-10"
          width={200} 
          height={100}
        />
      </div>

      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoIosCloseCircle size={28} /> : <TiThMenu size={28} />}
      </button>

      <nav
        className={`absolute md:static bg-amber-200 top-16 left-0 w-full md:w-auto bg-gelap md:bg-transparent flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 p-6 md:p-0 transition-all duration-300 ease-in-out transform -z-10 ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-5 scale-95 md:opacity-100 md:translate-y-0 md:scale-100 md:flex"
        }`}
      >
        <Link href="/" className="text-green-400">
          Beranda
        </Link>
        <Link href="/pesanan" className="hover:text-green-400">
          Pesanan Saya
        </Link>
        <Link href="/faq" className="hover:text-green-400">
          FAQ
        </Link>
        <Link href="/marketplace" className="hover:text-green-400">
          Marketplace
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
