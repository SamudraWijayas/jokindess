"use client";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const features = [
  {
    title: "Desain Modern & Responsif",
    description:
      "Website yang kami buat tampil optimal di berbagai perangkat, baik di desktop maupun mobile.",
  },
  {
    title: "Kecepatan Optimal",
    description:
      "Kami memastikan website Anda memiliki waktu muat yang cepat, sehingga pengunjung tidak perlu menunggu.",
  },
  {
    title: "SEO Friendly",
    description:
      "Dengan struktur yang ramah mesin pencari, website Anda lebih mudah ditemukan oleh pelanggan potensial.",
  },
  {
    title: "Dukungan 24/7",
    description:
      "Kami hadir setiap saat untuk memastikan website Anda selalu berjalan lancar.",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-16 text-black dark:text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Kiri: List fitur */}
        <div data-aos="fade-down">
          <h2 className="text-3xl font-bold mb-6">
            Mengapa Memilih <span className="text-green-800 dark:text-cyan-400 ">Kami?</span>
          </h2>
          <p className="text-gray-700 dark:text-white mb-8">
            Kami memahami betapa pentingnya memiliki website yang tidak hanya
            indah dilihat, tetapi juga fungsional dan mampu mengonversi
            pengunjung menjadi pelanggan. Berikut alasan terbaik memilih kami:
          </p>

          <ul className="space-y-6">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <FaCheckCircle className="text-green-800 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-gray-700 dark:text-white text-sm mt-1">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Kanan: Box fokus */}
        <div
          className="bg-green-200/50 dark:bg-[#0a2615] border dark:border-white/10 border-green-800/20 rounded-xl p-12 flex items-center justify-center text-center h-90"
          data-aos="fade-up"
        >
          <div className="flex gap-2">
            <span className="text-4xl mb-4 block">🚀</span>
            <h3 className="text-3xl font-bold text-cyan-400">
              Fokus pada Kualitas
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
