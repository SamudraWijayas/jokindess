"use client";

import React from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  jenisProyek: string;
  waktuPengerjaan: string;
  deskripsi: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    jenisProyek: "Website",
    waktuPengerjaan: "00 Bulan 2000",
    deskripsi: "hwjefhuhf",
    rating: 70,
    image: "/image.png",
  },
  {
    id: 2,
    jenisProyek: "Website",
    waktuPengerjaan: "00 Bulan 2000",
    deskripsi: "hwjefhf",
    rating: 70,
    image: "/image.png",
  },
  {
    id: 3,
    jenisProyek: "Website",
    waktuPengerjaan: "00 Januari 2000",
    deskripsi: "hwjefhuhfejhfuhfweddddddddddddddddddddwedewd",
    rating: 70,
    image: "/image.png",
  },
  {
    id: 4,
    jenisProyek: "Website",
    waktuPengerjaan: "00 Bulan 2000",
    deskripsi: "hwjefhuhfejhf",
    rating: 70,
    image: "/image.png",
  },
];

const Testimonials: React.FC = () => {
  return (
    <div className="text-white flex flex-col items-center py-10 relative" id="faq">
      <h2 className="text-center text-3xl font-bold mb-4">
        Testimoni Klien Kami
      </h2>
      <p className="text-center mb-12">
        Dipercaya oleh banyak klien untuk menyelesaikan proyeknya dengan 00++
        proyek dari berbagai jenis proyek
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-8">
        <Image
          src="/rectangle/rectangle4.png"
          alt="Coding Illustration"
          className="absolute w-60 -z-10 -right-0 lg:-bottom-[3em]"
          width={120}
          height={120}
        />
        <Image
          src="/rectangle/rectangle5.png"
          alt="Coding Illustration"
          className="absolute w-40 -left-0 lg:bottom-[1em] -z-10"
          width={120}
          height={120}
        />

        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-gray-800 p-4 rounded-lg w-full max-w-xs mx-auto sm:mx-0"
          >
            <div className="flex items-center mb-4 gap-4">
              <Image
                src={testimonial.image}
                alt="User profile"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex justify-between gap-2">
                  <div className="w-1/2 overflow-hidden">
                    <p className="text-[13px] text-white">Jenis Proyek</p>
                    <p className="text-[12px] break-words text-green-600">
                      {testimonial.jenisProyek}
                    </p>
                  </div>
                  <div className="w-1/2 overflow-hidden">
                    <p className="text-[13px] text-white">Waktu Pengerjaan</p>
                    <p className="text-[12px] break-words text-green-600">
                      {testimonial.waktuPengerjaan}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-white mb-4 break-words">
              {testimonial.deskripsi}
            </p>
            <p className="text-sm text-white mb-4 text-right">
              Rating Rekomendasi
            </p>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-full bg-gray-700 rounded-full h-2.5 relative">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${testimonial.rating}%` }}
                ></div>
              </div>
              <p className="text-sm text-white">{testimonial.rating}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
