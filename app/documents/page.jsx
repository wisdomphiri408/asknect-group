// documents/page.jsx
import BookCard from "/components/BookCard.jsx";
import { Share } from 'lucide-react';
import Link from "next/link";
import { getDocuments, getUserInfo } from "@/utils/fetchDocuments";

export default async function Home() {
  // Fetch documents
  const documents = await getDocuments();

  // Fetch user info for each document
  const books = await Promise.all(
    documents.map(async (doc) => {
      const userInfo = await getUserInfo(doc.user_id);
      return {
        ...doc,
        user: userInfo, // Add user info to the document object
      };
    })
  );

  return (
    <div className="mx-auto max-w-7xl mt-16">
      <div className="flex justify-between items-center px-2 pt-1 mb-2 shadow dark:bg-gray-800">
        <h3 className="text-sm font-bold mb-6 text-center dark:text-gray-100">
          Explore Our Books
        </h3>
        <div className="actions">
          <Link href="/upload-documents" className="text-sm dark:text-gray-100 mb-2 flex items-center">
            <Share width={15} /> Share
          </Link>
        </div>
      </div>

      {/* Flex Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {books.map((book, index) => (
          <div key={index} className="border dark:border-gray-700">
            <BookCard key={book.id} book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}