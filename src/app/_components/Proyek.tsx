"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos"; // Tambahkan ini
import "aos/dist/aos.css"; // Import CSS AOS
import { motion } from "framer-motion"; // Tambahan

// Import react-icons for technology icons
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiFlutter, SiExpress, SiTailwindcss, SiPython } from "react-icons/si";

interface Proyek {
  _id?: string;
  title: string;
  description: string;
  image?: string | File;
  technologies: string[];
  oldprice: string;
  price: string;
  category: string;
}

const categories: string[] = [
  "All",
  "Website",
  "Joki Skripsi",
  "Mobile",
];

type CategoryColors = {
  [key: string]: string;
};

const categoryColors: CategoryColors = {
  All: "bg-blue-300 border-2 border-blue-500 text-blue-900",
  Website: "bg-red-300 border-2 border-red-500 text-red-900",
  "Undangan Web": "bg-blue-300 border-2 border-blue-500 text-blue-900",
  "Joki Skripsi": "bg-yellow-200 border-2 border-yellow-400 text-yellow-700",
  Mobile: "bg-green-200 border-2 border-green-400 text-green-700",
};

import React from "react";

// Map technology name to icon component
const normalizeTech = (tech: string) => tech.replace(/\s+/g, "").toLowerCase();
const techIcons: { [key: string]: React.ReactNode } = {
  reactjs: <FaReact className="inline mr-1 size-4" />,
  nodejs: <FaNodeJs className="inline mr-1 size-4" />,
  expressjs: <SiExpress className="inline mr-1 size-4" />,
  flutter: <SiFlutter className="inline mr-1 size-4" />,
  tailwindcss: <SiTailwindcss className="inline mr-1 size-4" />,
  python: <SiPython className="inline mr-1 size-4" />,
};

const ProjectList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [proyeks, setProyeks] = useState<Proyek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProyeks();
  }, []);

  const fetchProyeks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/proyek");
      if (!res.ok) throw new Error(`Gagal mengambil proyek: ${res.status}`);
      const result = await res.json();
      const proyeksData = Array.isArray(result.data) ? result.data : [];
      setProyeks(proyeksData);
    } catch {
      setError("error fetch");
    }
    setLoading(false);
  };

  const filteredProjects =
    selectedCategory === "All"
      ? proyeks
      : proyeks.filter((proyek) => proyek.category === selectedCategory);

  useEffect(() => {
    AOS.init({ duration: 500 }); // Pastikan AOS diinisialisasi
  }, []);

  return (
    <div
      className=" min-h-screen flex flex-col items-center px-2 py-26"
      id="proyek"
    >
      <h1
        className="dark:text-white text-black text-center text-2xl font-bold mb-4"
        data-aos="fade-up"
      >
        Kami Punya Proyek Siap Pakai
      </h1>
      <p
        className="dark:text-white text-black text-center mb-6"
        data-aos="fade-up"
      >
        Telusuri proyek terbaru kami, temukan proyek siap pakai sesuai
        kebutuhanmu untuk mendapatkan harga lebih murah dan penyelesaian lebih
        cepat!
      </p>

      <div
        className="flex flex-wrap justify-center gap-4 mb-8 px-2"
        data-aos="fade-up"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`py-2 px-4 rounded-lg transition-colors font-semibold text-sm md:text-base lg:text-sm ${
              selectedCategory === category
                ? categoryColors[category] ||
                  "bg-gray-300 border border-gray-500 text-black"
                : "dark:bg-[#0a2615] bg-white border dark:border-white/10 border-gray-300 dark:text-white text-black shadow-xl "
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          data-aos="fade-up"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((proyek, index) => (
              <motion.div
                key={proyek._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                  e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
                }}
                whileHover={{ scale: 1.03 }}
                className="relative bg-white dark:bg-[#0a2615] border dark:border-white/10 border-gray-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] p-4 rounded-lg w-[20em] overflow-hidden
    before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full
    before:rounded-lg before:pointer-events-none before:opacity-0 before:transition-opacity
    hover:before:opacity-100 hover:before:bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),_rgba(34,197,94,0.3)_0%,_transparent_30%)]"
              >
                {/* Background SVG Layer */}

                {/* Content Layer */}
                <div className="relative z-10 flex flex-col h-full">
                  {typeof proyek.image === "string" && proyek.image && (
                    <Image
                      src={proyek.image}
                      alt={proyek.title}
                      className="w-full h-40 object-cover mb-4 rounded-lg"
                      width={200}
                      height={100}
                    />
                  )}

                  <div className="flex-grow">
                    <p className="mb-2 font-bold">{proyek.description}</p>

                    <div className="flex flex-wrap gap-2 my-6">
                      {proyek.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-green-200 to-lime-200 text-black border border-white/10 py-1 px-3 rounded-full text-sm flex items-center"
                        >
                          {techIcons[normalizeTech(tech)] ?? null}
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer tetap di bawah */}
                  <div className="mt-auto">
                    <hr className="border border-gray-300 dark:border-gray-600" />
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-[13px]">Proyek Siap digunakan</span>
                      <div className="flex flex-col text-right">
                        <span className="dark:text-gray-300 text-black line-through text-[13px]">
                          Rp {proyek.oldprice}
                        </span>
                        <span className="dark:text-white text-black font-semibold text-[19px]">
                          Rp {proyek.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400">
              Tidak ada proyek dalam kategori ini.
            </p>
          )}
        </div>
      )}

      {/* <div className="mt-8">
        <a href="#" className="text-green-500">
          Lihat semua
        </a>
      </div> */}
    </div>
  );
};

export default ProjectList;
