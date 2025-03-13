import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/Order";
import dbConnect from "@/lib/dbConnect";

// Koneksi ke database
await dbConnect();

// GET: Menampilkan semua data order
export async function GET() {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data order" },
      { status: 500 }
    );
  }
}

// POST: Menambahkan order baru
export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Pastikan koneksi MongoDB terhubung

    const { service, details, deadline, whatsapp, status, price } =
      await req.json();

    if (!service || !details || !deadline || !whatsapp) {
      return NextResponse.json(
        { error: "Semua bidang wajib diisi" },
        { status: 400 }
      );
    }

    const newOrder = new Order({
      service,
      details,
      deadline,
      whatsapp,
      status: status || "process", // Berikan default jika status kosong
      price: price || "-", // Berikan default jika price kosong
    });

    await newOrder.save();

    return NextResponse.json(
      { message: "Pesanan berhasil disimpan", order: newOrder },
      { status: 201 }
    );
  } catch {
    console.error("Error saving order:");
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyimpan data" },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import Order from "@/models/Order";
// import dbConnect from "@/lib/dbConnect";

// export async function POST(req: NextRequest) {
//   await dbConnect();

//   try {
//     const { service, details, deadline, whatsapp } = await req.json();

//     if (!service || !details || !deadline || !whatsapp) {
//       return NextResponse.json(
//         { error: "Semua bidang wajib diisi" },
//         { status: 400 }
//       );
//     }

//     const newOrder = new Order({ service, details, deadline, whatsapp });
//     await newOrder.save();

//     return NextResponse.json(
//       { message: "Pesanan berhasil disimpan" },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Terjadi kesalahan saat menyimpan data" },
//       { status: 500 }
//     );
//   }
// }
