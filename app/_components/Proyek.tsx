"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos"; // Tambahkan ini
import "aos/dist/aos.css"; // Import CSS AOS

// Import react-icons for technology icons
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaPhp,
  FaAngular,
  FaVuejs,
  FaDocker,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiGraphql,
  SiRedux,
  SiFlutter,
  SiExpress,
} from "react-icons/si";

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
  "Website",
  "Undangan Web",
  "Joki Skripsi",
  "Mobile",
];

type CategoryColors = {
  [key: string]: string;
};

const categoryColors: CategoryColors = {
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
  node: <FaNodeJs className="inline mr-1" />,
  python: <FaPython className="inline mr-1" />,
  java: <FaJava className="inline mr-1" />,
  php: <FaPhp className="inline mr-1" />,
  angular: <FaAngular className="inline mr-1" />,
  vue: <FaVuejs className="inline mr-1" />,
  docker: <FaDocker className="inline mr-1" />,
  typescript: <SiTypescript className="inline mr-1" />,
  javascript: <SiJavascript className="inline mr-1" />,
  nextjs: <SiNextdotjs className="inline mr-1" />,
  mongodb: <SiMongodb className="inline mr-1" />,
  mysql: <SiMysql className="inline mr-1" />,
  tailwindcss: <SiTailwindcss className="inline mr-1" />,
  graphql: <SiGraphql className="inline mr-1" />,
  expressjs: <SiExpress className="inline mr-1 size-4" />,
  flutter: <SiFlutter className="inline mr-1 size-4" />,
};

const ProjectList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Website");
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

  const filteredProjects = proyeks.filter(
    (proyek) => proyek.category === selectedCategory
  );

  useEffect(() => {
    AOS.init({ duration: 500 }); // Pastikan AOS diinisialisasi
  }, []);

  return (
    <div
      className="text-white min-h-screen flex flex-col items-center px-2 py-26"
      id="proyek"
    >
      <h1 className="text-center text-2xl font-bold mb-4" data-aos="fade-up">
        Kami Punya Proyek Siap Pakai
      </h1>
      <p className="text-center mb-6" data-aos="fade-up">
        Telusuri proyek terbaru kami, temukan proyek siap pakai sesuai
        kebutuhanmu untuk mendapatkan harga lebih murah dan penyelesaian lebih
        cepat!
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`py-2 px-4 rounded-lg transition-colors font-semibold text-sm md:text-base lg:text-sm ${
              selectedCategory === category
                ? categoryColors[category]
                : "bg-groyy text-white"
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
            filteredProjects.map((proyek) => (
              <div
                key={proyek._id}
                className="bg-groyy p-4 rounded-lg w-[20em]"
              >
                {typeof proyek.image === "string" && proyek.image && (
                  <Image
                    src={proyek.image}
                    alt={proyek.title}
                    className="w-full h-40 object-cover mb-4 rounded-lg"
                    width={200}
                    height={100}
                  />
                )}
                <p className="mb-2">{proyek.description}</p>
                <div className="flex flex-wrap gap-2 my-6">
                  {proyek.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-background text-green-600 py-1 px-3 rounded-full text-sm flex items-center border-2 border-green-600 "
                    >
                      {techIcons[normalizeTech(tech)] ?? null}
                      {tech}
                    </span>
                  ))}
                </div>
                <hr />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[13px]">Proyek Siap digunakan</span>
                  <div className="flex flex-col text-right">
                    <span className="text-gray-500 line-through text-[13px]">
                      Rp {proyek.oldprice}
                    </span>
                    <span className="text-white font-semibold text-[19px]">
                      Rp {proyek.price}
                    </span>
                  </div>
                </div>
              </div>
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
