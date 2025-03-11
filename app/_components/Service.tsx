"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface FormData {
  service: string;
  details: string;
  deadline: string;
  whatsapp: string;
  status: string;
  price: string;
}

const ServicePage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    service: "",
    details: "",
    deadline: "",
    whatsapp: "",
    status: "process",
    price: "-",
  });

  const handleNext = () => {
    if (step === 2 && !formData.details) {
      toast.error("Silakan isi detail proyek terlebih dahulu.");
      return;
    }
    if (step === 3 && !formData.deadline) {
      toast.error("Silakan pilih deadline proyek terlebih dahulu.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    if (
      !formData.service ||
      !formData.details ||
      !formData.deadline ||
      !formData.whatsapp
    ) {
      toast.error("Semua bidang harus diisi.");
      return;
    }

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setFormData({
          service: "",
          details: "",
          deadline: "",
          whatsapp: "",
          status: "process",
          price: "-",
        });
        setStep(1);
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Terjadi kesalahan, coba lagi nanti.");
    }
  };

  return (
    <main className="flex flex-col items-center text-center p-6">
      <h2 className="text-2xl font-bold text-white">
        Halo Ndess, mau joki apa nih?
      </h2>
      <p className="mt-2 text-white">
        Kami menyediakan jasa IT termurah, tercepat, dan terpercaya.
      </p>

      {step === 1 && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleNext}
        >
          Lanjutkan
        </button>
      )}

      {step === 3 && (
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleSubmit}
        >
          Kirim
        </button>
      )}
    </main>
  );
};

export default ServicePage;
