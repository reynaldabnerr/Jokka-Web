import Link from "next/link";
import { FaSearch, FaUser } from "react-icons/fa";
import "tailwindcss/tailwind.css";

export default function Navbar() {
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
              <Link
                href="/"
                className="px-4 py-2 text-white hover:text-red-200 hover:bg-red-700 rounded-md transition-colors"
              >
                Home
              </Link>
              <Link
                href="/event"
                className="px-4 py-2 text-white hover:text-red-200 hover:bg-red-700 rounded-md transition-colors"
              >
                Event
              </Link>
              <Link
                href="/food"
                className="px-4 py-2 text-white hover:text-red-200 hover:bg-red-700 rounded-md transition-colors"
              >
                Food
              </Link>
              <Link
                href="/destination"
                className="px-4 py-2 text-white hover:text-red-200 hover:bg-red-700 rounded-md transition-colors"
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
