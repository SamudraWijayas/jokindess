"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // ✅ Menggunakan next/image
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Proyek {
  _id?: string;
  title: string;
  description: string;
  image?: string | File;
  technologies: string[];
  oldprice: string;
  price: string;
  category: string;
}

const initialProyek: Proyek = {
  title: "",
  description: "",
  image: "",
  technologies: [],
  oldprice: "",
  price: "",
  category: "",
};

export default function ProyekPage() {
  const [proyeks, setProyeks] = useState<Proyek[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingProyek, setEditingProyek] = useState<Proyek | null>(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user) fetchProyeks();
  }, [user]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          headers: { cookie: `token=${Cookies.get("token")}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setUser(data);
      } catch (error: unknown) {
        console.error("Error saat autentikasi:", error); // ✅ Menggunakan error untuk debugging
        alert("Silakan login terlebih dahulu.");
        router.push("/auth/login");
      }
    };

    checkAuth();
  }, [router]);

  const fetchProyeks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/proyek");
      if (!res.ok) throw new Error(`Gagal mengambil proyek: ${res.status}`);

      const result = await res.json();
      setProyeks(Array.isArray(result.data) ? result.data : []);
    } catch (error: unknown) {
      console.error("Fetch Error:", error); // ✅ Menggunakan error untuk debugging
    }
    setLoading(false);
  };

  if (!user)
    return <p className="text-center mt-10">Memeriksa autentikasi...</p>;

  return (
    <div className="container mx-auto p-6 bg-blueGray-700">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Daftar Proyek
      </h1>
      <Button
        onClick={() => {
          setEditingProyek(initialProyek);
          setOpen(true);
        }}
      >
        Tambah Proyek
      </Button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Gambar</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Harga Lama</TableHead>
                <TableHead>Harga Baru</TableHead>
                <TableHead>Teknologi</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {proyeks.map((proyek) => (
                <TableRow key={proyek._id}>
                  <TableCell>
                    {typeof proyek.image === "string" && proyek.image && (
                      <Image
                        src={proyek.image}
                        alt={proyek.title}
                        width={64}
                        height={64}
                        className="object-cover rounded-md"
                      />
                    )}
                  </TableCell>
                  <TableCell>{proyek.title}</TableCell>
                  <TableCell>{proyek.category}</TableCell>
                  <TableCell>{proyek.oldprice}</TableCell>
                  <TableCell>{proyek.price}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(proyek.technologies)
                        ? proyek.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="bg-blueGray-700 text-white px-2 py-1 rounded-md text-sm"
                            >
                              {tech}
                            </span>
                          ))
                        : "Tidak ada teknologi"}
                    </div>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingProyek(proyek);
                        setOpen(true);
                      }}
                      className="text-white"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => console.log("Hapus proyek", proyek._id)}
                    >
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Form Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              {editingProyek?._id ? "Edit" : "Tambah"} Proyek
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="title">Judul Proyek</Label>
            <Input
              id="title"
              value={editingProyek?.title || ""}
              onChange={(e) =>
                setEditingProyek((prev) => ({
                  ...prev!,
                  title: e.target.value,
                }))
              }
            />
            <Label htmlFor="category">Kategori</Label>
            <Select
              onValueChange={(value) =>
                setEditingProyek((prev) => ({ ...prev!, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Web">Web</SelectItem>
                <SelectItem value="Mobile">Mobile</SelectItem>
                <SelectItem value="Desktop">Desktop</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={() => console.log("Simpan proyek")}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
