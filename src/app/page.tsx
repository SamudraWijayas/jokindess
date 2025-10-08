"use client";

import About from "./_components/About";
import Hero from "./_components/Hero";
import Order from "./_components/Order";
import Paket from "./_components/Paket/Paket";
import Proyek from "./_components/Proyek";

export default function Home() {
  return (
    <>
      <Hero />
      <Paket />
      <Proyek />
      <Order />
      <About/>
    </>
  );
}
