"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Order {
  _id: string;
  service: string;
  details: string;
  deadline: string;
  whatsapp: string;
  status: string;
  price: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("process");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          headers: { cookie: `token=${Cookies.get("token")}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setUser(data);
      } catch {
        alert("Silakan login terlebih dahulu.");
        router.push("/auth/login");
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/order");
      const data = await res.json();
      setOrders(data);
    } catch {
      console.error("Gagal mengambil data order.");
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return <p className="text-center mt-10">Memeriksa autentikasi...</p>;

  return (
    <div className="container mx-auto p-6 bg-blueGray-700">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Daftar Order
      </h1>

      <div className="flex justify-center gap-4 mb-4">
        <Button
          onClick={() => setTab("process")}
          variant={tab === "process" ? "default" : "outline"}
          className={
            tab === "process"
              ? "bg-orange-500 text-amber-50"
              : "bg-gray-200 text-black"
          }
        >
          Process
        </Button>
        <Button
          onClick={() => setTab("done")}
          variant={tab === "done" ? "default" : "outline"}
          className={
            tab === "done" ? "bg-pink-500 text-white" : "bg-gray-200 text-black"
          }
        >
          Done
        </Button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Layanan</TableHead>
              <TableHead>Detail</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Harga</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {orders
              .filter((order) => order.status === tab)
              .map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.service}</TableCell>
                  <TableCell>{order.details}</TableCell>
                  <TableCell>{order.deadline}</TableCell>
                  <TableCell>{order.whatsapp}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>Rp {order.price}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
