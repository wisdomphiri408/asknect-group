import { useState, useEffect, useRef } from "react";
import { Menu, Bell, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DarkModeToggle from "./DarkModeToggle";
import SearchBar from "./SearchBar";

export default function Header({ onToggleSidebar }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const popupRef = useRef(null); // Ref to track the popup

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto pl-1 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left Side: Sidebar Toggle & Navigation */}
          <div className="flex items-center">
            <button onClick={onToggleSidebar} className="text-white">
              <Menu className="h-6 w-6 text-black dark:text-white" />
            </button>
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              <Link href="/documents" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Documents
              </Link>
              <Link href="/qa" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Q&A
              </Link>
            </nav>
          </div>

          {/* Right Side: Search, Notifications, User */}
          <div className="flex items-center space-x-4">
            <SearchBar />

            {/* Bell Icon (Only visible on larger screens) */}
            <button className="hidden md:flex text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
              <Bell className="h-6 w-6" />
            </button>

            {/* User Icon */}
            <div className="relative" ref={popupRef}>
              <button
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                onClick={() => {
                  if (window.innerWidth >= 1024) {
                    // lg: and up → Navigate directly
                    router.push("/user");
                  } else {
                    // Below lg: → Toggle popup
                    setIsOpen(!isOpen);
                  }
                }}
              >
                <User className="h-6 w-6" />
              </button>

              {/* Popup for small screens */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
                  <button
                    onClick={() => {
                      router.push("/user");
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md small-text"
                  >
                    <div className="flex items-center">
                     <User className="h-6 w-6 mr-1" />
                      My Profile
                    </div>

                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <div className="flex items-center">
                      <Bell className="h-6 w-6 dark:text-gray-300" />
                      <span className="small-text dark:text-gray-300">
                        Notifications
                      </span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle (Only visible on larger screens) */}
            <div className="hidden md:flex items-center">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
