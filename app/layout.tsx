import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Joki Ndess - Jasa Pembuatan Website Profesional",
    template: "%s - Solusi Implementasi proyek IT tercepat dan terpercaya",
  },
  description:
    "Kami hadir sebagai solusi terpercaya untuk mewujudkan proyek IT Anda dengan harga terjangkau, proses cepat, dan hasil yang memuaskan.",
  icons: {
    icon: "/favicon.ico", // pastikan file ini ada di folder public
  },
  openGraph: {
    title: "Joki Ndess - Jasa Pembuatan Website Profesional",
    description:
      "Kami hadir sebagai solusi terpercaya untuk mewujudkan proyek IT Anda dengan harga terjangkau, proses cepat, dan hasil yang memuaskan.",
    url: "https://www.jokindess.com",
    siteName: "Joki Ndess",
    images: [
      {
        url: "https://www.jokindess.com/opengraph-image.jpg", // taruh gambar ini di /public/
        width: 1200,
        height: 630,
        alt: "Joki Ndess Open Graph Image",
      },
    ],
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster /> {/* Tambahkan ini */}
        {children}
      </body>
    </html>
  );
}
