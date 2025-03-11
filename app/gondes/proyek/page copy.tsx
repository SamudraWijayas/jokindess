"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

interface Proyek {
  _id?: string;
  title: string;
  description: string;
  image: string;
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

  useEffect(() => {
    fetchProyeks();
  }, []);

  const fetchProyeks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/proyek");
      if (!res.ok) throw new Error(`Gagal mengambil proyek: ${res.status}`);
      setProyeks(await res.json());
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editingProyek) return;
  
    // Validasi data kosong
    if (
      !editingProyek.title ||
      !editingProyek.description ||
      !editingProyek.image ||
      !editingProyek.technologies ||
      !editingProyek.oldprice ||
      !editingProyek.price ||
      !editingProyek.category
    ) {
      alert("Harap isi semua bidang!");
      return;
    }
  
    try {
      const res = await fetch(
        editingProyek._id ? `/api/proyek/${editingProyek._id}` : "/api/proyek",
        {
          method: editingProyek._id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...editingProyek,
            technologies: Array.isArray(editingProyek.technologies)
              ? editingProyek.technologies
              : [],
          }),
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Daftar Proyek</h1>
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
        <ul>
          {proyeks.map((proyek) => (
            <li key={proyek._id} className="border p-4 mb-2">
              <strong>{proyek.title}</strong> - {proyek.category} -{" "}
              {Array.isArray(proyek.technologies)
                ? proyek.technologies.join(", ")
                : "Tidak ada teknologi"}  
              <div className="flex gap-2 mt-2">
                <Button
                  onClick={() => {
                    setEditingProyek(proyek);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button onClick={() => handleDelete(proyek._id!)}>Hapus</Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Form Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProyek?._id ? "Edit" : "Tambah"} Proyek
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {Object.keys(initialProyek).map(
              (key) =>
                key !== "technologies" && (
                  <div key={key}>
                    <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                    <Input
                      value={(editingProyek as any)?.[key] || ""}
                      onChange={(e) =>
                        setEditingProyek((prev) =>
                          prev ? { ...prev, [key]: e.target.value } : null
                        )
                      }
                    />
                  </div>
                )
            )}

            <Label>Teknologi</Label>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "MongoDB", "Node.js"].map((tech) => (
                <label key={tech} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={tech}
                    checked={editingProyek?.technologies.includes(tech)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setEditingProyek((prev) =>
                        prev
                          ? {
                              ...prev,
                              technologies: checked
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
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
