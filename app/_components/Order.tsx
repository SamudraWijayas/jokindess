import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import Link from "next/link";

const faqs = [
  {
    question: "Apa saja layanan yang ditawarkan?",
    answer:
      "Kami menyediakan berbagai layanan terkait pembuatan website, termasuk Website perusahaan (Company Profile), Toko online (E-commerce), Website portofolio, Undangan website, website tugas kuliah, joki skripsi dan Custom website sesuai kebutuhan.",
  },
  {
    question: "Berapa lama waktu pengerjaan proyek?",
    answer:
      "Waktu pengerjaan bergantung pada kompleksitas proyek. Secara umum, proyek seperti Website standar: 5–10 hari kerja, Website dengan fitur khusus: 10–30 hari kerja.",
  },
  {
    question: "Berapa kali revisi yang bisa saya dapatkan?",
    answer:
      "Kami menyediakan hingga 5 kali revisi minor, seperti penyesuaian warna, penambahan fitur sederhana, dan perubahan kecil lainnya. Jika diperlukan revisi tambahan di luar jatah yang diberikan, akan ada biaya tambahan sesuai dengan tingkat perubahan yang diminta.",
  },
];

const Order: NextPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="text-white items-center py-26 px-2 sm:px-8 lg:px-12"
      id="faq"
    >
      <div className="w-full mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">
          Gimana, Sudah Yakin?
        </h1>
        <p className="text-center sm:text-left">
          Yuk pesan layanan kami sekarang juga dan jadikan kami sebagai mitra
          terbaikmu dalam menghadirkan solusi IT yang hebat!
        </p>
        <div className="flex justify-center sm:justify-start">
          <Link
            href="#service" // Ganti dengan nomor WhatsApp admin
            className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition inline-block text-center"
          >
            Pesan Sekarang
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row justify-between mt-14 space-y-6 lg:space-y-0 lg:space-x-10">
          <div className="flex flex-col lg:w-1/2">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center lg:text-left">
              Masih bingung? Tenang, kami siap membantumu
            </h1>
            <p className="text-center lg:text-left">
              Jika ada pertanyaan lain yang belum ada di sini boleh tanyakan dan
              konsultasikan langsung di sini.
            </p>
          </div>

          <div className="w-full lg:w-1/2 max-w-2xl space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-groyy text-white rounded-lg shadow-md"
              >
                <button
                  onClick={() => toggleDropdown(index)}
                  className="w-full flex justify-between items-center p-4 text-left"
                >
                  {faq.question}
                  <FaAngleDown
                    size={16}
                    className={`transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 border-t border-gray-700 text-gray-300">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
