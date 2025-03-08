// components/ClientLayout.js
"use client"; // Mark this as a Client Component

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

export default function ClientLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Client-side state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  }

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} /> {/* Pass toggle function to header */}
      <div className="flex">
        {/* Sidebar only shows if isSidebarOpen is true */}
        {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
        <main className="pl-0 pt-4 sm:pl-6 w-full pr-0 sm:pr-5 ml-0 lg:ml-64">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}