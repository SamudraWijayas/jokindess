import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Joki Ndess - Jasa Pembuatan Website Profesional dan Terpercaya",
    template: "%s | Jokindess",
  },
  description:
    "Kami hadir sebagai solusi terpercaya untuk mewujudkan proyek IT Anda dengan harga terjangkau, proses cepat, dan hasil yang memuaskan.",
  metadataBase: new URL("https://www.jokindess.com"),
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    keywords:
      "jasa pembuatan website, joki website, joki tugas kuliah, bikin website cepat, website murah",
    robots: "index, follow",
  },
  verification: {
    google: "THqDBXkHKgpoKYtE8ZDkdg_Zm-lj_Z05TgsCgbhn1wek",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joki Ndess - Jasa Pembuatan Website Profesional",
    description:
      "Solusi terpercaya untuk joki tugas website, landing page bisnis, dan portofolio. Cepat, murah, dan profesional.",
    images: ["https://www.jokindess.com/opengraph-image.jpg"],
  },
  openGraph: {
    title: "Joki Ndess - Jasa Pembuatan Website Profesional",
    description:
      "Kami hadir sebagai solusi terpercaya untuk mewujudkan proyek IT Anda dengan harga terjangkau, proses cepat, dan hasil yang memuaskan.",
    url: "https://www.jokindess.com",
    siteName: "Joki Ndess",
    images: [
      {
        url: "https://www.jokindess.com/opengraph-image.jpg",
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
    <html lang="id">
      <head>
        {/* Schema Markup for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Joki Ndess",
              url: "https://www.jokindess.com",
              logo: "/favicon.ico",
              sameAs: [
                "https://www.instagram.com/jokindesss", // opsional
              ],
            }),
          }}
        />
      </head>
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
