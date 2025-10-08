export interface PaketType {
  title: string;
  description: string;
  oldPrice?: string;
  price?: string;
  features: string[];
  recommended?: boolean;
  isCustom?: boolean;
}

export const paketData: PaketType[] = [
  {
    title: "Paket Standar",
    description:
      "Solusi sempurna untuk usaha kecil dan penggunaan pribadi yang ingin tampil online.",
    oldPrice: "2.000.000",
    price: "699.000",
    features: [
      "Desain Modern & Responsif",
      "Optimasi SEO On-Page",
      "Integrasi Social Media",
      "Integrasi Google Analytics",
      "SSL Security (HTTPS)",
      "Speed Optimization",
      "Free Hosting 1 Tahun",
      "Free Domain .com",
      "3x Revisi",
    ],
  },
  {
    title: "Paket Bisnis",
    description:
      "Dirancang untuk bisnis yang berkembang dengan fitur lebih untuk mendukung pertumbuhan.",
    oldPrice: "3.500.000",
    price: "1.999.000",
    features: [
      "Desain Premium & Responsif",
      "Full SEO Optimization",
      "CMS Admin Panel",
      "Blog/News System",
      "Form Contact & WhatsApp",
      "Google Maps Integration",
      "Google Analytics & Search Console",
      "Social Media Integration",
      "SSL Security (HTTPS)",
      "Advanced Speed Optimization",
      "Free Hosting 1 Tahun",
      "Free Domain .com",
      "Free Maintenance 6 Bulan",
      "5x Revisi",
    ],
    recommended: true,
  },
//   {
//     title: "Paket Premium",
//     description:
//       "Untuk bisnis yang ingin memperkuat kehadiran online dan menonjol di pasar kompetitif.",
//     oldPrice: "7.500.000",
//     price: "2.999.000",
//     features: [
//       "Halaman Tanpa Batas",
//       "Fitur & Integrasi Kustom",
//       "Optimasi SEO Premium",
//       "Admin Dashboard",
//       "Integrasi Payment Gateway",
//       "Dukungan Respons Cepat",
//     ],
//   },
  {
    title: "Paket Kustom",
    description:
      "Kustomisasi lengkap sesuai kebutuhan spesifik Anda, dengan solusi unik.",
    features: [
      "Melayani Tugas Web Mahasiswa",
      "Halaman & Fitur Kustom",
      "Konsultasi Langsung",
      "Dukungan Khusus",
    ],
    isCustom: true,
  },
];
