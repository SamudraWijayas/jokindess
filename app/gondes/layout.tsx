import Sidebar from "@/app/_components/admin/Sidebar";
import Header from "@/app/_components/admin/Header";
import AdminNavbar from "@/app/_components/admin/AdminNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Sidebar */}
      <Sidebar />
      <div className="relative md:ml-64">
        <AdminNavbar />
        {/* Header */}
        <Header />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
        </div>
      </div>
    </div>
  );
}
