"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function Sidebar() {
  const pathname = usePathname();
console.log({pathname});
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-center">Habit Tracker</h2>
      <ul className="space-y-6">
        <li>
          <Link
            href="/"
            className={`text-lg p-3 rounded-lg transition-all duration-300 ${
              pathname === "/" ? "bg-primary text-white" : "hover:bg-hover-bg"
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/archive"
            className={`text-lg p-3 rounded-lg transition-all duration-300 ${
              pathname === "/archive" ? "bg-primary text-white" : "hover:bg-hover-bg"
            }`}
          >
            Archive
          </Link>
        </li>
      </ul>
    </div>
  );
}
