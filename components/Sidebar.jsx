"use client"; // Mark this as a Client Component

import { useEffect, useRef } from "react";
import Link from "next/link";
import { FileText, HelpCircle, X } from "lucide-react";
import Image from "next/image";

export default function Sidebar({ isOpen, onClose }) {
  const sidebarRef = useRef(null); // Ref to track the sidebar element

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose(); // Close the sidebar
      }
    }

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <aside
      ref={sidebarRef} // Attach the ref to the sidebar
      className={`z-20 w-64 bg-white pt-20 dark:bg-gray-800 p-4 fixed top-0 bottom-0 left-0 h-screen transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      {/* Logo & Close Button */}
      <div className="flex justify-between items-center mb-2">
        {/* Logo - Stays as a Link */}
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex gap-x-1"
        >
          <Image
            src="/assets/icons/favicon.png"
            alt="logo"
            width={30}
            height={30}
            className="rounded-full"
          />
          Asknect
        </Link>

        {/* Close Button (NOT inside the Link) */}
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md lg:hidden"
        >
          <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      <nav className="space-y-2">
        <Link
          href="/documents"
          className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          onClick={onClose} // Close sidebar when a link is clicked
        >
          <FileText className="h-5 w-5" />
          <span>Documents</span>
        </Link>
        <Link
          href="/qa"
          className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          onClick={onClose} // Close sidebar when a link is clicked
        >
          <HelpCircle className="h-5 w-5" />
          <span>Q&A Forum</span>
        </Link>
      </nav>
    </aside>
  );
}