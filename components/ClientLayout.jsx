"use client"; // Mark this as a Client Component

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

export default function ClientLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to closed
  const [mounted, setMounted] = useState(false); // Track if component is mounted

  useEffect(() => {
    setMounted(true); // Mark the component as mounted
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} /> {/* Pass toggle function to header */}
      <div className="flex">
        {/* Render sidebar only after component is mounted */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className={`pl-0 pt-4 sm:pl-6 w-full lg:ml-64 pr-0 sm:pr-5 ${mounted && isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}