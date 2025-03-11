"use client";

import React, { useState, ChangeEvent } from "react";
import { message } from "antd";

interface FormData {
  service: string;
  details: string;
  deadline: string;
  whatsapp: string;
}

const ServicePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    service: "",
    details: "",
    deadline: "",
    whatsapp: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.service ||
      !formData.details ||
      !formData.deadline ||
      !formData.whatsapp
    ) {
      message.error("Semua bidang harus diisi!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, date: new Date().toISOString() }),
      });

      if (response.ok) {
        message.success("Data berhasil disimpan!");
        setFormData({ service: "", details: "", deadline: "", whatsapp: "" });
      } else {
        message.error("Gagal menyimpan data!");
      }
    } catch (error) {
      console.error(error);
      message.error("Terjadi kesalahan!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold">Tambah Jasa</h2>
      <input
        name="service"
        placeholder="Jenis Jasa"
        value={formData.service}
        onChange={handleChange}
        className="border p-2 mt-2 w-full"
      />
      <textarea
        name="details"
        placeholder="Detail Proyek"
        value={formData.details}
        onChange={handleChange}
        className="border p-2 mt-2 w-full"
      />
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        className="border p-2 mt-2 w-full"
      />
      <input
        name="whatsapp"
        placeholder="Nomor WhatsApp"
        value={formData.whatsapp}
        onChange={handleChange}
        className="border p-2 mt-2 w-full"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 p-2 bg-green-500 text-white"
      >
        {loading ? "Mengirim..." : "Kirim Data"}
      </button>
    </main>
  );
};

export default ServicePage;
