"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/_components/Navbarpo";
import { motion } from "framer-motion";

const projects = [
  {
    link: "https://ybalampung.org/",
    title: "Website Yayasan",
    description:
      "Website profil sekolah yang dilengkapi dengan berbagai fitur mulai dari galeri, artikel, dan lainnya.",
    image: "/porto/yba.png",
  },
  {
    link: "https://foodieframe.vercel.app/",
    title: "Website Resep Makanan",
    description: "Website resep makanan tradisional Indonesia.",
    image: "/porto/foodieFrame.png",
  },
  {
    link: "https://prcsewamobillampung.vercel.app/",
    title: "Website Rental Mobil",
    description:
      "Website sewa mobil yang menawarkan kenyamanan, keandalan, dan kemewahan.",
    image: "/porto/prc.png",
  },
];

export default function PortofolioClient() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen mb-24 pt-26 lg:pt-26">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Portofolio Saya
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-10">
              Beberapa proyek unggulan yang telah saya kerjakan:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link
                key={project.link}
                href={project.link}
                target="_blank"
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: index * 0.2,
                  }}
                  whileHover={{
                    scale: 1.04,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                  className="flex flex-col h-full dark:bg-[#0a2615] bg-white border dark:border-white/10 border-gray-300 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 overflow-hidden"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {project.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex-grow">
                      {project.description}
                    </p>
                    <p className="mt-3 text-sm text-green-600 dark:text-green-400 font-semibold">
                      Lihat Detail →
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
