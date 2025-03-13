import React from "react";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="px-6 sm:px-8 lg:px-12 text-white border-t border-gray-300/50">
        <div className="w-full mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <h1 className="flex items-center gap-3 text-xl sm:text-3xl font-bold">
              <Image
                src="/logo.png"
                alt="Logo"
                className="max-w-[50px]"
                width={200}
                height={100}
              />
              Joki Ndes
            </h1>
            <Link
              href="https://www.instagram.com/jokindesss?igsh=Zmt2OWJqb2Frcm1k"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mt-4 sm:mt-0 text-gray-300 hover:text-gray-400 transition"
            >
              <FaInstagram className="mr-1" /> @jokindess
            </Link>
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center text-sm py-4 border-t border-gray-300/30">
          © JokiNdess 2025. All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
