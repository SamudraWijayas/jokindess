import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-2">Halaman belum tersedia</p>
      <Link
        href="/"
        className="mt-4 px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
