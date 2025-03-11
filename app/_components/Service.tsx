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
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, whatsapp: value });

    // Validasi real-time: Cek apakah nomor diawali angka 0 dan panjang minimal 10
    if (!/^0\d{9,}$/.test(value)) {
      setError("Nomor WhatsApp harus diawali dengan 0 dan minimal 10 angka");
    } else {
      setError(""); // Hapus error jika valid
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
      setIsModalVisible(true); // Tampilkan modal jika deskripsi kosong
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
          status: formData.status || "process", // Pastikan status selalu dikirim
          price: formData.price || "-", // Pastikan price selalu dikirim
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setIsModalVisiblewa(false); // Tutup modal setelah submit sukses
        setFormData({
          service: "",
          details: "",
          deadline: "",
          whatsapp: "",
          status: "process",
          price: "-",
        }); // Reset form setelah submit sukses
        setStep(1); // Kembali ke step awal
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
      <section className="mt-7 bg-groyy lg:h-[451px] p-6 rounded-lg max-w-4xl w-full relative">
        <Image
          src="/rectangle/rectangle3.png"
          alt="Decorative"
          className="absolute -bottom-10 -z-10 -right-6 md:-right-81 w-30 md:w-70 h-auto"
          width={120}
          height={120}
        />
        <Image
          src="/rectangle/rectangle2.png"
          alt="Decorative"
          className="absolute -bottom-10 -z-10 -left-6 md:-left-81 w-30 md:w-70 h-auto"
          width={120}
          height={120}
        />

        <div className="p-6 rounded-lg relative">
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
                <h3 className="text-2xl font-bold text-white text-left">
                  Apa jenis proyeknya?
                </h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map(({ name, description }) => (
                    <div
                      key={name}
                      className={`p-4 shadow-xl rounded-lg border-2 cursor-pointer min-h-[100px] text-left ${
                        selectedService === name
                          ? "border-green-600"
                          : "border-gray-500"
                      }`}
                      onClick={() => handleServiceSelection(name)}
                    >
                      <h4 className="font-bold text-xl text-green-600">
                        {name}
                      </h4>
                      <p className="text-white mt-2">{description}</p>
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
                <h3 className="text-2xl font-bold text-white text-left">
                  Detail Proyek
                </h3>
                <p className="mt-2 text-white text-left">
                  Ceritakan gambaran dari proyekmu
                </p>
                <textarea
                  name="details"
                  placeholder="Masukkan detail proyek Anda"
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full h-40 mt-2 p-2 bg-gelap-1 border border-gray-500 rounded text-white"
                />
                <button
                  onClick={handleNext}
                  className="mt-4 px-4 py-2 bg-ijo text-white rounded"
                >
                  Next
                </button>
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
                <h3 className="text-2xl font-bold text-white text-left">
                  Deadline Proyek
                </h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`p-4 shadow-xl rounded-lg border cursor-pointer ${
                      formData.deadline && formData.deadline !== "Fleksibel"
                        ? "border-ijo"
                        : "border-groyy"
                    }`}
                    onClick={() => setFormData({ ...formData, deadline: "" })}
                  >
                    <h4 className="font-bold text-ijo">Tentukan Deadline</h4>
                    <input
                      type="date"
                      name="deadline"
                      value={
                        formData.deadline !== "Fleksibel"
                          ? formData.deadline
                          : ""
                      }
                      onChange={handleChanges}
                      className="mt-2 p-2 border rounded w-full"
                    />
                  </div>
                  <div
                    className={`p-4 shadow-xl rounded-lg border cursor-pointer ${
                      formData.deadline === "Fleksibel"
                        ? "border-ijo"
                        : "border-groyy"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, deadline: "Fleksibel" })
                    }
                  >
                    <h4 className="font-bold text-ijo">Jadwal Fleksibel</h4>
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className="mt-4 px-4 py-2 bg-ijo text-white rounded"
                >
                  Next
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <Modal
        title="Peringatan"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => setIsModalVisible(false)}
      >
        <p>Silakan isi deskripsi proyek terlebih dahulu sebelum melanjutkan.</p>
      </Modal>
      <Modal
        open={isModalVisiblewa}
        onCancel={() => setIsModalVisiblewa(false)}
        footer={null}
        className="custom-modal"
      >
        <div className="p-4">
          <h1 className="text-center text-2xl font-bold mb-1">
            Wah, kami belum punya kontakmu!
          </h1>
          <p className="text-white text-center mb-4 text-[17px]">
            Yuk diisi! Kami membutuhkan kontakmu untuk mendiskusikan proyek.
          </p>
          <Form layout="vertical">
            <Form.Item
              name="whatsapp"
              label={<span style={{ color: "white" }}>Whatsapp</span>}
              rules={[
                { required: true, message: "Tolong masukkan nomor WhatsApp!" },
              ]}
            >
              <Input
                type="text"
                name="whatsapp"
                placeholder="Masukkan nomor WhatsApp"
                value={formData.whatsapp}
                onChange={handleChanges}
                className="w-full text-lg border-gray-300 rounded-md h-11 placeholder:text-lg"
              />
            </Form.Item>
          </Form>

          {error && <p className="text-red-500 -mt-5 text-sm">{error}</p>}

          <div className="flex justify-end mt-4 space-x-2">
            <Button
              onClick={() => setIsModalVisiblewa(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!!error || !formData.whatsapp} // Disable jika ada error atau kosong
              className={`px-4 py-2 rounded-md text-white ${
                error || !formData.whatsapp
                  ? "btn-ijo-opacity cursor-not-allowed"
                  : "btn-ijo hover:bg-green-700"
              }`}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default ServicePage;
