import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "./components/SideBar";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = {
  title: "Habit Tracker",
  description: "Manage your habits effectively",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-8 bg-card-bg shadow-md rounded-lg">
            {children}
          </main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
