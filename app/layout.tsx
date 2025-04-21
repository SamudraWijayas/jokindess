import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Joki Ndess - Jasa Pembuatan Website Profesional",
    template: "%s - Solusi Implementasi proyek IT tercepat dan terpercaya",
  },
  description:
    "Joki Ndess's Professional web development services for your business",
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
