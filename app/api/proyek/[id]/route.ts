import { NextRequest, NextResponse } from "next/server";
import Proyek from "@/models/Proyek";
import dbConnect from "@/lib/dbConnect";
import cloudinary from "cloudinary";

// **Konfigurasi Cloudinary**
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// **GET: Ambil proyek berdasarkan ID**
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const proyek = await Proyek.findById(params.id);
    if (!proyek)
      return NextResponse.json(
        { error: "Proyek tidak ditemukan" },
        { status: 404 }
      );

    return NextResponse.json(proyek, { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Gagal mengambil proyek" },
      { status: 500 }
    );
  }
}

// **PUT: Update proyek berdasarkan ID**
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const oldprice = formData.get("oldprice")?.toString() || "";
    const price = formData.get("price")?.toString() || "";
    const category = formData.get("category")?.toString() || "";

    const technologiesRaw = formData.getAll("technologies");
    let technologies: string[] = technologiesRaw
      .map((item) => (typeof item === "string" ? item : ""))
      .filter((item) => item !== "");

    // Coba parse JSON jika data dikirim dalam format JSON string
    if (technologies.length === 1) {
      try {
        technologies = JSON.parse(technologies[0]); // Jika formatnya JSON string, parse ke array
      } catch {
        technologies = technologies[0]
          .split(",")
          .map((tech) => tech.replace(/^\[?"|"?\]$/g, "").trim()); // Bersihkan format jika bukan JSON
      }
    }

    const proyek = await Proyek.findById(params.id);
    if (!proyek) {
      return NextResponse.json(
        { error: "Proyek tidak ditemukan" },
        { status: 404 }
      );
    }

    let imageUrl = proyek.image; // Gunakan gambar lama jika tidak ada gambar baru
    const newImage = formData.get("image") as File | null;

    if (newImage) {
      // **Hapus gambar lama di Cloudinary**
      const publicId = proyek.image.split("/").pop()?.split(".")[0]; // Ambil public_id dari URL
      if (publicId) {
        await cloudinary.v2.uploader.destroy(`proyek/${publicId}`);
      }

      // **Upload gambar baru ke Cloudinary**
      const arrayBuffer = await newImage.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse: unknown = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream({ folder: "proyek" }, (error, result) => {
            if (error) reject(error);
            resolve(result);
          })
          .end(buffer);
      });

      imageUrl = (uploadResponse as { secure_url: string }).secure_url;
    }

    // **Update proyek di MongoDB**
    const updatedProyek = await Proyek.findByIdAndUpdate(
      params.id,
      {
        title,
        description,
        oldprice,
        price,
        category,
        technologies,
        image: imageUrl,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Proyek berhasil diperbarui", proyek: updatedProyek },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui proyek" },
      { status: 500 }
    );
  }
}

// **DELETE: Hapus proyek berdasarkan ID**
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const proyek = await Proyek.findById(params.id);
    if (!proyek) {
      return NextResponse.json(
        { error: "Proyek tidak ditemukan" },
        { status: 404 }
      );
    }

    // **Hapus gambar dari Cloudinary**
    const publicId = proyek.image.split("/").pop()?.split(".")[0]; // Ambil public_id dari URL
    if (publicId) {
      await cloudinary.v2.uploader.destroy(`proyek/${publicId}`);
    }

    // **Hapus proyek dari database**
    await Proyek.findByIdAndDelete(params.id);

    return NextResponse.json(
      { message: "Proyek berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Gagal menghapus proyek" },
      { status: 500 }
    );
  }
}
