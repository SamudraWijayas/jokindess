"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          headers: { cookie: `token=${Cookies.get("token")}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setUser(data);
      } catch (error) {
        alert("Silakan login terlebih dahulu.");
        router.push("/auth/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });

    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {user ? (
        <>
          <h1 className="text-2xl font-bold">Selamat Datang, {user.name}!</h1>
          <button
            onClick={handleLogout}
            className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Memuat data...</p>
      )}
    </div>
  );
}
