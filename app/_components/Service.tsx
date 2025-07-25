"use client";

import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
  const [whatsappError, setWhatsappError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Hanya izinkan angka
    value = value.replace(/\D/g, "");

    // Pastikan panjangnya maksimal 10 angka
    // if (value.length > 10) value = value.slice(0, 10);

    // Update formData
    setFormData({ ...formData, whatsapp: value });

    // Validasi
    if (value === "") {
      setWhatsappError("Masukkan no Whatsapp diawali angka 0");
    } else if (!value.startsWith("0")) {
      setWhatsappError("Nomor harus diawali dengan angka 0.");
    } else if (value.length < 10) {
      setWhatsappError("Nomor harus berisi 10 angka atau lebih");
    } else {
      setWhatsappError("");
    }
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
        body: JSON.stringify(formData),
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

        // Nomor WhatsApp penerima (Admin)
        const adminNumber = "6287718517731"; // Ganti dengan nomor admin (format internasional tanpa "+")

        // Format pesan untuk dikirim ke WhatsApp
        const pesanWA = `Halo Admin, ada pesanan baru!
        *Jenis Jasa:* ${formData.service}
        *Detail:* ${formData.details}
        *Deadline:* ${formData.deadline}`;

        // Kirim ke WhatsApp Admin
        const waLink = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
          pesanWA
        )}`;
        window.open(waLink, "_blank");
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Terjadi kesalahan, coba lagi nanti.");
    }
  };

  return (
    <main
      className="flex flex-col items-center text-center py-26 p-6 text-black"
      id="service"
    >
      <h2
        className="text-2xl font-bold text-black dark:text-white"
        data-aos="fade-up"
      >
        Halo Ndess, mau joki apa nih?
      </h2>
      <p className="mt-2 text-black dark:text-white" data-aos="fade-up">
        Kami menyediakan jasa IT termurah, tercepat, dan terpercaya.
      </p>
      <div className="mt-10 w-full h-full max-w-4xl relative">
        <section
          className="mt-7 dark:bg-[#0a2615] bg-white border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] lg:h-[76vh] p-1 lg:p-6 rounded-lg lg:max-w-4xl lg:w-full w-full max-w-5xl relative"
          data-aos="fade-up"
        >
          <motion.div
            className="p-6 rounded-lg relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="flex items-center justify-center space-x-4 mb-10">
              {steps.map((Icon, index) => (
                <React.Fragment key={index}>
                  <span
                    className={`px-2 py-1 rounded-md cursor-pointer ${
                      step === index + 1 || visitedSteps.includes(index + 1)
                        ? "bg-green-600 text-white"
                        : "bg-gray-300"
                    }`}
                    onClick={() => setStep(index + 1)}
                  >
                    <Icon className="text-2xl" />
                  </span>
                  {index !== steps.length - 1 && ( // Jangan tampilkan garis setelah ikon terakhir
                    <div
                      className={`w-10 h-1 ${
                        visitedSteps.includes(index + 2)
                          ? "bg-ijo"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 ">
                    <div>
                      <h3 className="text-2xl font-bold dark:text-white text-black">
                        Apa jenis proyeknya?
                      </h3>
                      <p className="text-black dark:text-gray-300 mt-1 text-[16px] text-left">
                        Proyekmu termasuk yang mana?
                      </p>
                    </div>
                    <Link
                      href="https://wa.me/6287718517731" // Ganti dengan nomor WhatsApp admin
                      className="text-black dark:text-gray-300 underline hover:text-gray-400 transition"
                    >
                      Diskusi via chat aja lah
                    </Link>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map(({ name, description }) => (
                      <div
                        key={name}
                        className={`p-4 shadow-xl rounded-lg cursor-pointer min-h-[100px] text-left ${
                          selectedService === name
                            ? "border-green-600 border-2"
                            : "border-gray-300 border"
                        }`}
                        onClick={() => handleServiceSelection(name)}
                      >
                        <h4 className="font-bold text-xl text-green-600">
                          {name}
                        </h4>
                        <p className="dark:text-white text-black mt-2">
                          {description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold dark:text-white text-black text-left">
                        Detail Proyek
                      </h3>
                      <p className="text-black dark:text-gray-300 mt-1 text-[16px] text-left">
                        Ceritakan gambaran dari proyekmu
                      </p>
                    </div>
                    <Link
                      href="https://wa.me/6287718517731" // Ganti dengan nomor WhatsApp admin
                      className="text-black dark:text-gray-300 underline hover:text-gray-400 transition"
                    >
                      Diskusi via chat aja lah
                    </Link>
                  </div>
                  <textarea
                    name="details"
                    placeholder="Masukkan detail proyek Anda"
                    value={formData.details}
                    onChange={handleChange}
                    className="w-full h-40 mt-2 p-4 rounded-xl border border-gray-300 dark:bg-gelap-1  dark:border-green-500 text-black dark:text-white"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 text-white rounded bg-green-600"
                    >
                      Next
                    </button>
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold dark:text-white text-black text-left">
                        Deadline Proyek
                      </h3>
                      <p className="text-black dark:text-gray-300 mt-1 text-[16px] text-left">
                        Kapan proyek ini harus diselesaikan?
                      </p>
                    </div>
                    <Link
                      href="https://wa.me/6287718517731"
                      className="text-black dark:text-gray-300 underline hover:text-gray-400 transition self-start md:self-auto"
                    >
                      Diskusi via chat aja lah
                    </Link>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`p-4 shadow-lg rounded-lg border-2 cursor-pointer ${
                        formData.deadline && formData.deadline !== "Fleksibel"
                          ? "border-green-600"
                          : "border-white/10"
                      }`}
                    >
                      <h4 className="font-bold dark:text-white text-black text-left text-[13px]">
                        Pilih Tanggal
                      </h4>
                      <input
                        type="date"
                        name="deadline"
                        value={
                          formData.deadline && formData.deadline !== "Fleksibel"
                            ? formData.deadline
                            : ""
                        }
                        onChange={(e) =>
                          setFormData({ ...formData, deadline: e.target.value })
                        }
                        className="mt-2 p-2 border-1 border-gray-500/50 rounded w-full dark:text-white text-black focus:outline-none focus:ring-0"
                        style={{
                          colorScheme: "dark", // Biar tanggal juga putih di mode dark
                        }}
                      />
                    </div>
                    <div
                      className={`p-4 shadow-lg rounded-lg border cursor-pointer text-left flex items-center ${
                        formData.deadline === "Fleksibel"
                          ? "border-green-600"
                          : "border-white/10"
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, deadline: "Fleksibel" })
                      }
                    >
                      <h4 className="font-bold text-[13px] dark:text-white text-black text-left flex items-center">
                        Jadwal Fleksibel
                      </h4>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 text-white rounded bg-green-600"
                    >
                      Next
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
        <div
          data-v-d214f860=""
          className="absolute lg:w-full w-60 -z-1 inset-0 bg-gradient-to-r from-green-300 to-blue-300 dark:from-green-400 dark:to-blue-400 rounded-3xl transform -rotate-6 scale-105 opacity-20"
        ></div>
      </div>
      <Dialog open={isModalVisible} onOpenChange={setIsModalVisible}>
        <DialogContent className="text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center font-bold mb-3">
              Kamu belum mengisi deskripsi
            </DialogTitle>
            <DialogDescription className="text-white text-[17px]">
              Silahkan isi deskripsi proyek terlebih dahulu sebelum melanjutkan.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={isModalVisiblewa} onOpenChange={setIsModalVisiblewa}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl text-white text-center">
              Wah, kami belum punya kontakmu!
            </DialogTitle>
            <DialogDescription className="text-[16px] text-center text-gray-300 mb-3">
              Yuk diisi! Kami membutuhkan kontakmu untuk mendiskusikan proyek.
            </DialogDescription>
          </DialogHeader>
          <Label className="text-white">WhatsApp</Label>
          <Input
            type="text"
            name="whatsapp"
            placeholder="Masukkan nomor WhatsApp"
            value={formData.whatsapp}
            onChange={handleChanges}
            className="w-full text-lg border-gray-300 rounded-md h-10 text-white placeholder:text-lg"
          />
          {whatsappError && (
            <p className="text-red-400 text-sm -mt-3">{whatsappError}</p>
          )}

          <div className="flex justify-end mt-4 space-x-2">
            <Button
              onClick={() => setIsModalVisiblewa(false)}
              className="bg-gray-600 text-white"
            >
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!formData.whatsapp || whatsappError !== ""}
              className={`text-white ${
                !formData.whatsapp || whatsappError !== ""
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600"
              }`}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default ServicePage;
