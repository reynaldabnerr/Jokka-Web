"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { FaSearch, FaUser } from "react-icons/fa";
import "tailwindcss/tailwind.css";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Fungsi untuk menambahkan kelas pada link aktif
  const getLinkClasses = (path: string) =>
    pathname === path
      ? "px-4 py-2 text-red-600 bg-white rounded-md transition-colors" // gaya untuk link aktif
      : "px-4 py-2 text-white hover:text-red-200 hover:bg-red-700 rounded-md transition-colors"; // gaya untuk link non-aktif

  return (
    <nav className="w-full bg-red-600 border-b border-red-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-white">
              Jokka
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-4">
              <Link href="/" className={getLinkClasses("/")}>
                Home
              </Link>
              <Link href="/event" className={getLinkClasses("/event")}>
                Event
              </Link>
              <Link href="/food" className={getLinkClasses("/food")}>
                Food
              </Link>
              <Link
                href="/destination"
                className={getLinkClasses("/destination")}
              >
                Destination
              </Link>
            </div>
          </div>

          {/* Search and User */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari sesuatu..."
                className="w-72 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <button className="p-2 hover:bg-red-700 rounded-full transition-colors">
              <FaUser className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
