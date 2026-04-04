import Sidebar from "@/Components/admin/SideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen max-w-full overflow-x-hidden">
        {children}
      </div>
    </div>
  );
} 