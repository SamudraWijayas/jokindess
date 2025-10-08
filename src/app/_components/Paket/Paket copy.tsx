"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PaketModal from "./ModalPaket";
import { useDisclosure } from "@heroui/react"; // pastikan Heroui mendukung useDisclosure
import { paketData, PaketType } from "../../../../utils/paketData";

const Paket = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPaket, setSelectedPaket] = useState<PaketType | null>(null);

  const handleOrder = (paket: PaketType) => {
    if (paket.isCustom) {
      router.push("/");
    } else {
      setSelectedPaket(paket);
      onOpen(); // buka modal
    }
  };

  const handleClose = () => {
    setSelectedPaket(null);
    onClose(); // tutup modal
  };
  if (selectedPaket) {
    console.log("Modal render", selectedPaket);
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-16 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">
        Pilih Paket Anda
      </h1>
      <p className="text-center mb-12 max-w-2xl text-gray-300 text-lg">
        Pilih paket yang sesuai kebutuhan bisnis Anda. Paket kustom menawarkan
        solusi unik sesuai permintaan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
        {paketData.map((paket, index) => (
          <motion.div
            key={paket.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative text-black dark:text-white bg-white dark:bg-[#0a2615] border dark:border-white/10 backdrop-blur-md border-gray-200 rounded-xl p-8 flex flex-col justify-between shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            {paket.recommended && (
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-200 to-cyan-200 text-black text-sm font-semibold px-4 py-1 rounded-full shadow-lg animate-bounce">
                Recommended
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold mb-2">{paket.title}</h2>
              <p className="mb-6">{paket.description}</p>

              {paket.oldPrice && paket.price && (
                <div className="mb-6 flex flex-col items-baseline gap-1">
                  <span className="line-through text-gray-500">
                    Rp {paket.oldPrice}
                  </span>
                  <span className="text-blue-400 font-extrabold text-2xl">
                    Rp {paket.price}
                  </span>
                </div>
              )}

              <ul className="mb-8 space-y-3">
                {paket.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-3 text-green-400 text-xl">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleOrder(paket)}
              className="mt-auto py-3 px-6 bg-gradient-to-r from-green-200 to-cyan-200 rounded-xl text-black font-semibold text-lg hover:opacity-90 transition"
            >
              {paket.isCustom ? "Lihat Detail" : "Order Sekarang"}
            </button>
          </motion.div>
        ))}
      </div>

      {selectedPaket && (
        <PaketModal
          paket={selectedPaket}
          isOpen={isOpen}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default Paket;
