import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/Order";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

// GET: Menampilkan satu order berdasarkan ID
export async function GET(
  req: NextRequest,
  context: { params: Record<string, any> }
) {
  await dbConnect();
  const id = context.params?.id; // Mengambil ID dari params

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
  }

  try {
    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json(
        { error: "Order tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error saat mengambil data order:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data" },
      { status: 500 }
    );
  }
}

// PUT: Memperbarui order berdasarkan ID
export async function PUT(
  req: NextRequest,
  context: { params: Record<string, any> }
) {
  await dbConnect();
  const id = context.params?.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
  }

  try {
    const body = await req.json();

    const updatedOrder = await Order.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return NextResponse.json(
        { error: "Order tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Pesanan berhasil diperbarui", order: updatedOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memperbarui data" },
      { status: 500 }
    );
  }
}

// DELETE: Menghapus order berdasarkan ID
export async function DELETE(
  req: NextRequest,
  context: { params: Record<string, any> }
) {
  await dbConnect();
  const id = context.params?.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
  }

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return NextResponse.json(
        { error: "Order tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Pesanan berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saat menghapus order:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menghapus data" },
      { status: 500 }
    );
  }
}
