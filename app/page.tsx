"use client";

import { motion } from "framer-motion";
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
      <div className="homepage min-h-screen mb-27 pt-10 lg:pt-20">
        <div className="container mx-auto  lg:px-12 relative z-10">
          <div className="hero grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20 px-6 md:px-10 pt-20">
            {/* Text Section */}
            <div className="text-left z-2">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
                className="text-3xl md:text-5xl font-extrabold leading-tight dark:text-white text-[#0a2615]"
              >
                Bingung Soal{" "}
                <span
                  className="
                bg-gradient-to-r dark:from-green-400 dark:to-lime-500 from-[#14532d] to-[#166534] transition-colors duration-500
                text-transparent bg-clip-text"
                >
                  Pemrograman Website?
                </span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="mt-4 text-lg md:text-xl text-green-800 dark:text-white font-semibold"
              >
                Kami Siap Membantu Proyek Koding Anda,{" "}
                <span className="text-green-600 underline font-semibold">
                  Mulai dari Rp99K!
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                className="mt-4 text-green-900 dark:text-white text-sm md:text-base leading-relaxed text-left font-semibold"
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
            <div className="relative max-w-4xl w-full mx-auto">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="bg-white dark:bg-[#0a2615] p-4 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md 
    transform rotate-[1.5deg] hover:rotate-0 hover:scale-105 transition-transform duration-500 ease-out"
              >
                <div className="bg-white dark:bg-green-950/80 rounded-2xl shadow-[0_0px_35px_rgba(0,0,0,0.3)]">
                  <div className="bg-green-100/90 rounded-t-lg px-4 py-3 flex items-center space-x-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                    <div className="flex-1 bg-white rounded-lg px-3 py-1 text-xs text-gray-600">
                      jokindess.com
                    </div>
                  </div>

                  <div className="p-4 md:p-6 space-y-4 text-white">
                    <div className="text-sm text-[#047857] dark:text-white">
                      Jasa Pembuatan Website Profesional
                    </div>
                    <div className="h-4 w-full bg-gradient-to-r from-green-200 to-emerald-200 dark:bg-gray-400/40 rounded-full animate-pulse" />
                    <div className="h-4 w-3/4 bg-gradient-to-r from-green-200 to-teal-200 dark:bg-gray-400/30 rounded-full animate-pulse" />
                    <div className="hidden lg:block">
                      <div className="h-32 w-full bg-gradient-to-r from-green-200 to-lime-200 dark:bg-gray-500/40 rounded-xl animate-pulse" />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="h-16 bg-gradient-to-r from-green-200 to-cyan-200 dark:bg-gray-400/40 rounded-lg animate-pulse" />
                        <div className="h-16 bg-gradient-to-r from-green-200 to-sky-200 dark:bg-gray-300/40 rounded-lg animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="absolute -z-1 inset-0 bg-gradient-to-r from-green-300 to-blue-300 dark:from-green-200 dark:to-blue-200 rounded-3xl transform rotate-6 scale-105 opacity-20 transition-colors duration-500" />
            </div>
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
