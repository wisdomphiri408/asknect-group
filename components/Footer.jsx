import Link from "next/link";
import { FileText, HelpCircle, House, Bell } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex fixed bottom-0 right-0 left-0 md:hidden">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
          <nav className="flex justify-between w-full text-sm">

          {/* Notifications Icon at the Bottom */}
          <div className="flex justify-center items-center"> 
            <Link
              href="/notifications"
              className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <Bell className="h-10 w-6" />
            </Link>
          </div>

            {/* Home Link */}
            <Link
              href="/"
              className="small-text text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex flex-col items-center"
            >
              <House className="h-5 w-5" />   
              Home
            </Link>

            {/* Q&A Link */}
            <Link
              href="/qa"
              className="small-text text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex flex-col items-center"
            >
              <HelpCircle className="h-5 w-5" />
              QandA
            </Link>

            {/* Documents Link */}
            <Link
              href="/documents"
              className="small-text text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex flex-col items-center"
            >
              <FileText className="h-5 w-5" />
              Documents
            </Link>

            {/* Dark Mode Toggle */}
            <div 
              onClick={() => document.querySelector("button[aria-label='Toggle dark mode']").click()} 
              className="small-text text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex flex-col items-center cursor-pointer"
            >
              <DarkModeToggle className="h-5 w-5" />
              Theme
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
