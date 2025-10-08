import { NextRequest, NextResponse } from "next/server";

import cloudinary from "cloudinary";
import dbConnect from "../../../../lib/dbConnect";
import Proyek from "../../../../models/Proyek";

// **HANDLER GET** - Ambil semua proyek dari database
export async function GET() {
  try {
    await dbConnect(); // Hubungkan ke MongoDB

    const proyekList = await Proyek.find(); // Ambil semua proyek

    return NextResponse.json(
      { message: "Data proyek ditemukan", data: proyekList },
      { status: 200 }
    );
  } catch {
    console.error("Error GET");
    return NextResponse.json(
      { message: "Gagal mengambil data proyek" },
      { status: 500 }
    );
  }
}

// Konfigurasi Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const oldprice = formData.get("oldprice")?.toString() || "";
    const price = formData.get("price")?.toString() || "";
    const category = formData.get("category")?.toString() || "";

    const technologiesRaw = formData.getAll("technologies");

    // Pastikan semua elemen dalam technologiesRaw adalah string
    let technologies: string[] = technologiesRaw
      .map((item) => (typeof item === "string" ? item : ""))
      .filter((item) => item !== ""); // Buang elemen kosong

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

    // **Upload ke Cloudinary**
    let imageUrl = "";
    const image = formData.get("image") as File | null;
    if (image) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse: CloudinaryResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.v2.uploader
            .upload_stream(
              { folder: "proyek" }, // Simpan di folder "proyek" di Cloudinary
              (error, result) => {
                if (error) return reject(error);
                resolve(result as CloudinaryResponse);
              }
            )
            .end(buffer);
        }
      );

      imageUrl = uploadResponse.secure_url;
    }

    // **Simpan ke MongoDB**
    const proyekBaru = await Proyek.create({
      title,
      description,
      oldprice,
      price,
      category,
      technologies,
      image: imageUrl, // Simpan URL dari Cloudinary
    });

    return NextResponse.json(
      { message: "Proyek berhasil disimpan", data: proyekBaru },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error POST:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
