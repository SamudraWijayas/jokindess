"use client";

import "animate.css";
import Image from "next/image";
import Navbar from "@/app/_components/Navbar";
import Service from "@/app/_components/Service";
import Proyek from "@/app/_components/Proyek";
// import Testimoni from "@/app/_components/Testimoni";
import Order from "@/app/_components/Order";
import Footer from "@/app/_components/Footer";
import Link from "next/link";
import ParticlesBackground from "../components/ui/ParticlesBackground";

const Home: React.FC = () => {
  return (
    <>
      <ParticlesBackground id="tsparticles" />
      <Navbar />
      <div className="homepage text-white mb-27 pt-10 lg:pt-37 ">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="hero grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20 px-6 md:px-10 pt-20">
            {/* Decorative Rectangle */}
            <div className="absolute top-24 left-0 w-20 md:w-30 h-auto hidden md:block animate__animated animate__fadeInLeft">
              <Image
                src="/rectangle/rectangle1.png"
                alt="Green decorative rectangle"
                width={120}
                height={60}
                priority
              />
            </div>

            {/* Text Section */}
            <div className="box text-center md:text-left animate__animated animate__fadeInUp">
              <h1 className="text-3xl md:text-5xl font-bold text-green-600">
                Kamu Bingung Soal Pemrograman Website,
              </h1>

              <h2 className="mt-4 text-lg md:text-xl">
                <span>Kami Siap Membantu Proyek Koding Anda, </span>
                <span className="text-green-600 text-xl md:text-2xl underline">
                  Mulai dari Rp99K!
                </span>
              </h2>
              <p className="mt-4 text-gray-300 text-sm md:text-base leading-relaxed">
                Kami hadir sebagai solusi terpercaya untuk mewujudkan proyek IT
                Anda dengan harga terjangkau, proses cepat, dan hasil yang
                memuaskan. Dengan fokus pada kualitas dan kepuasan pelanggan,
                kami menyediakan layanan implementasi proyek koding yang efisien
                dan sesuai kebutuhan Anda. Percayakan proyek Anda pada kami, dan
                dapatkan solusi terbaik dengan harga yang ramah di kantong!
              </p>
              <Link
                href="#service" // Ganti dengan nomor WhatsApp admin
                className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition inline-block text-center"
              >
                Pesan Sekarang
              </Link>
            </div>

            {/* Image Section */}
            <div className="box flex justify-center md:justify-end items-center animate__animated animate__fadeInDown">
              <Image
                src="/image.png"
                alt="Coding Illustration"
                width={400}
                height={300}
                priority
              />
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
