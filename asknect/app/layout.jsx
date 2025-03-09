import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import GoogleAnalytics from "@/components/GoogleAnalytics"; // Import Google Analytics
import { SessionProvider } from '@/context/SessionContext';

export const metadata = {
  title: "Asknect",
  description: "A platform for students to ask questions, and download learning materials.",
  keywords: "students, learning, education, study materials, question and answer, e-learning, asknect, asknet, documents, free download, QandA",
  icons: {
    icon: "/assets/icons/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className="dark:bg-gray-900 bg-gray-50 pb-20">
        <GoogleAnalytics /> {/* Add Google Analytics */}
        <ClientLayout>
        <SessionProvider>{children}</SessionProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
