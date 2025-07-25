"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/app/_components/Navbar";
import Service from "@/app/_components/Service";
import Proyek from "@/app/_components/Proyek";
// import Testimoni from "@/app/_components/Testimoni";
import Order from "@/app/_components/Order";
import Footer from "@/app/_components/Footer";
import Link from "next/link";
// import ParticlesBackground from "../components/ui/ParticlesBackground";

const Home: React.FC = () => {
  return (
    <>
      {/* <ParticlesBackground id="tsparticles" /> */}
      <Navbar />
      <div className="homepage text-white mb-27 pt-10 lg:pt-32">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="hero grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20 px-6 md:px-10 pt-20">
            {/* Decorative Rectangle */}
            <div className="absolute top-0 left-0 w-20 md:w-30 h-auto hidden md:block -z-1">
              <Image
                src="/rectangle/rectangle1.png"
                alt="Green decorative rectangle"
                width={120}
                height={60}
                priority
              />
            </div>

            {/* Text Section */}
            <div className="text-white text-center md:text-left z-2">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
                className="text-3xl md:text-5xl font-extrabold leading-tight"
              >
                Bingung Soal{" "}
                <span className="bg-gradient-to-r from-green-400 to-lime-500 text-transparent bg-clip-text">
                  Pemrograman Website?
                </span>
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="mt-4 text-lg md:text-xl text-gray-200"
              >
                Kami Siap Membantu Proyek Koding Anda,{" "}
                <span className="text-green-400 underline font-semibold">
                  Mulai dari Rp99K!
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                className="mt-4 text-gray-400 text-sm md:text-base leading-relaxed"
              >
                Kami hadir sebagai solusi terpercaya untuk mewujudkan proyek IT
                Anda dengan harga terjangkau, proses cepat, dan hasil memuaskan.
                Fokus pada kualitas dan kepuasan pelanggan.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                className="mt-6 inline-block"
              >
                <Link
                  href="#service"
                  className="px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition"
                >
                  🚀 Pesan Sekarang
                </Link>
              </motion.div>
            </div>

            {/* Image Section (Mock Browser) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="bg-[#0a2615] border border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden backdrop-blur-md 
            transform rotate-[1.5deg] hover:rotate-0 hover:scale-105 transition-transform duration-500 ease-out"
            >
              <div className="bg-green-100/90 px-4 py-3 flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                </div>
                <div className="flex-1 bg-white rounded-lg px-3 py-1 text-xs text-gray-600">
                  jokindess.com
                </div>
              </div>
              <div className="p-6 space-y-4 text-white">
                <div className="text-sm text-gray-200">
                  Jasa Pembuatan Website Profesional
                </div>
                <div className="h-4 w-full bg-green-400/40 rounded-full animate-pulse" />
                <div className="h-4 w-3/4 bg-green-400/30 rounded-full animate-pulse" />
                <div className="h-32 w-full bg-green-500/40 rounded-xl animate-pulse" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-16 bg-green-400/40 rounded-lg animate-pulse" />
                  <div className="h-16 bg-green-300/40 rounded-lg animate-pulse" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Service />
      <Proyek />
      {/* <Testimoni/> */}
      <Order />
      <Footer />
    </>
  );
};

export default Home;
