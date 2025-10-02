import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "../app/_components/DarkModeProvider";

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
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Joki Ndess",
              url: "https://www.jokindess.com",
              logo: "/favicon.ico",
              sameAs: ["https://www.instagram.com/jokindesss"],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Beranda",
                  item: "https://www.jokindess.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Portofolio",
                  item: "https://www.jokindess.com/portofolio",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Undangan Digital",
                  item: "https://www.undangin.jokindess.com",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-green-50 dark:bg-[#03230f] text-black dark:text-white transition-colors ">
        <DarkModeProvider>
          <Toaster />
          {/* Mesh Background hanya untuk Light Mode */}
          <div className="fixed inset-0 overflow-hidden -z-10 dark:hidden">
            <div
              className="w-[150%] h-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-60"
              style={{
                animation: "meshMoveMulti 15s ease-in-out infinite",
                backgroundImage: `
        radial-gradient(circle at 30% 30%, #bbf7d0, transparent 60%),
        radial-gradient(circle at 70% 40%, #86efac, transparent 60%),
        radial-gradient(circle at 50% 80%, #4ade80, transparent 60%)`,
              }}
            />
          </div>

          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
