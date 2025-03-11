import React from "react";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";

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
            <p className="flex items-center mt-4 sm:mt-0">
              <FaInstagram className="mr-1" /> @jokindess
            </p>
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
