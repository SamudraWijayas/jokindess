"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, Input, Button, Form } from "antd";
import { MdDateRange } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";

interface FormData {
  service: string;
  details: string;
  deadline: string;
  whatsapp: string;
  status: string;
  price: string;
}

const services = [
  { name: "Website", description: "Landing page, company profile, dll." },
  { name: "Undangan Web", description: "Undangan nikah, ulang tahun, dll." },
  { name: "Joki Skripsi", description: "Deep learning, AR, dll." },
  {
    name: "Custom",
    description: "Pilih jika proyekmu tidak tersedia di atas.",
  },
];

const steps = [CiViewList, IoDocumentTextOutline, MdDateRange];

const ServicePage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([1]);
  const [formData, setFormData] = useState<FormData>({
    service: "",
    details: "",
    deadline: "",
    whatsapp: "",
    status: "process",
    price: "-",
  });
  const [selectedService, setSelectedService] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalVisiblewa, setIsModalVisiblewa] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, whatsapp: value });
  };

  const handleServiceSelection = (service: string) => {
    if (service === "Undangan Web") {
      router.push("/undangan");
    } else {
      setFormData((prev) => ({ ...prev, service }));
      setSelectedService(service);
      handleNext();
    }
  };

  const handleNext = () => {
    if (step === 2 && !formData.details) {
      setIsModalVisible(true);
      return;
    }
    if (step === 3 && !formData.deadline) {
      alert("Silakan pilih deadline proyek terlebih dahulu");
      return;
    }
    if (step === 3) {
      setIsModalVisiblewa(true);
      return;
    }
    setStep((prev) => prev + 1);
    setVisitedSteps((prev) => [...new Set([...prev, step + 1])]);
  };

  const handleSubmit = async () => {
    if (
      !formData.service ||
      !formData.details ||
      !formData.deadline ||
      !formData.whatsapp
    ) {
      toast.error("Semua bidang harus diisi");
      return;
    }

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: formData.service,
          details: formData.details,
          deadline: formData.deadline,
          whatsapp: formData.whatsapp,
          status: formData.status || "process",
          price: formData.price || "-",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setIsModalVisiblewa(false);
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
    } catch (error) {
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
    </main>
  );
};

export default ServicePage;
