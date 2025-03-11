"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  image?: string | File; // ✅ Bisa berupa string (URL) atau File
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
      } catch (error) {
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
      console.log("Raw data dari API:", result); // Debugging

      // Ambil hanya bagian "data"
      const proyeksData = Array.isArray(result.data) ? result.data : [];

      console.log("Formatted data:", proyeksData); // Debugging
      setProyeks(proyeksData);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editingProyek) return;

    if (
      !editingProyek.title ||
      !editingProyek.description ||
      !editingProyek.oldprice ||
      !editingProyek.price ||
      !editingProyek.category ||
      editingProyek.technologies.length === 0
    ) {
      alert("Harap isi semua bidang!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", editingProyek.title);
      formData.append("description", editingProyek.description);
      formData.append("oldprice", editingProyek.oldprice);
      formData.append("price", editingProyek.price);
      formData.append("category", editingProyek.category);
      formData.append(
        "technologies",
        JSON.stringify(editingProyek.technologies)
      );

      if (editingProyek.image && typeof editingProyek.image !== "string") {
        formData.append("image", editingProyek.image);
      }

      const res = await fetch(
        editingProyek._id ? `/api/proyek/${editingProyek._id}` : "/api/proyek",
        {
          method: editingProyek._id ? "PUT" : "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Gagal menyimpan proyek: ${res.status} - ${errorText}`);
      }

      setOpen(false);
      fetchProyeks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus proyek ini?")) return;
    try {
      await fetch(`/api/proyek/${id}`, { method: "DELETE" });
      fetchProyeks();
    } catch (error) {
      console.error("Gagal menghapus proyek:", error);
    }
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
                      <img
                        src={proyek.image}
                        alt={proyek.title}
                        className="w-16 h-16 object-cover rounded-md"
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
                        : typeof proyek.technologies === "string"
                        ? JSON.parse(proyek.technologies).map(
                            (tech: string, index: number) => (
                              <span
                                key={index}
                                className="bg-blueGray-700 text-gray-800 px-2 py-1 rounded-md text-sm"
                              >
                                {tech}
                              </span>
                            )
                          )
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
                      onClick={() => handleDelete(proyek._id!)}
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
            <Label>Judul</Label>
            <Input
              value={editingProyek?.title || ""}
              onChange={(e) =>
                setEditingProyek((prev) =>
                  prev ? { ...prev, title: e.target.value } : null
                )
              }
            />

            <Label>Deskripsi</Label>
            <Input
              value={editingProyek?.description || ""}
              onChange={(e) =>
                setEditingProyek((prev) =>
                  prev ? { ...prev, description: e.target.value } : null
                )
              }
            />

            <Label>Harga Lama</Label>
            <Input
              value={editingProyek?.oldprice || ""}
              onChange={(e) =>
                setEditingProyek((prev) =>
                  prev ? { ...prev, oldprice: e.target.value } : null
                )
              }
            />

            <Label>Harga Baru</Label>
            <Input
              value={editingProyek?.price || ""}
              onChange={(e) =>
                setEditingProyek((prev) =>
                  prev ? { ...prev, price: e.target.value } : null
                )
              }
            />

            <Label>Teknologi</Label>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "MongoDB", "Node.js"].map((tech) => (
                <label key={tech} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={tech}
                    checked={editingProyek?.technologies.includes(tech)}
                    onChange={(e) => {
                      setEditingProyek((prev) =>
                        prev
                          ? {
                              ...prev,
                              technologies: e.target.checked
                                ? [...prev.technologies, tech]
                                : prev.technologies.filter((t) => t !== tech),
                            }
                          : null
                      );
                    }}
                  />
                  {tech}
                </label>
              ))}
            </div>

            <Label>Kategori</Label>
            <Select
              value={editingProyek?.category || ""}
              onValueChange={(value) =>
                setEditingProyek((prev) =>
                  prev ? { ...prev, category: value } : null
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="Undangan Web">Undangan Web</SelectItem>
                <SelectItem value="Joki Skripsi">Joki Skripsi</SelectItem>
              </SelectContent>
            </Select>

            <Label>Upload Gambar</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setEditingProyek((prev) =>
                  prev
                    ? { ...prev, image: e.target.files?.[0] || prev.image }
                    : null
                )
              }
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
