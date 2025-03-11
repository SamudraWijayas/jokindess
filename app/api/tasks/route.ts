// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import { Task } from "@/models/Task";

// export async function GET() {
//   try {
//     await connectToDatabase();
//     const tasks = await Task.find();
//     return NextResponse.json({ success: true, data: tasks });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Gagal mengambil data" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: Request) {
//   try {
//     await connectToDatabase();
//     const body = await req.json();
//     const newTask = await Task.create({
//       ...body,
//       date: new Date().toISOString(),
//     });
//     return NextResponse.json({ success: true, data: newTask });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Gagal menyimpan data" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req: Request) {
//   try {
//     await connectToDatabase();
//     const { id } = await req.json();
//     await Task.findByIdAndDelete(id);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Gagal menghapus data" },
//       { status: 500 }
//     );
//   }
// }
