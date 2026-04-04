"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Posts", path: "/admin/blogs" },
    { name: "Create Posts", path: "/admin/create" },
    { name: "Categories", path: "/admin/categories" },
  ];

  return (
    <aside className="w-64 min-w-[16rem] bg-gray-800 text-white h-screen fixed overflow-y-auto">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-6 py-3 rounded hover:bg-gray-700 ${
              pathname === item.path ? "bg-gray-700" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}