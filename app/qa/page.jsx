// app/page.js (Server Component)
import { fetchPosts } from "@/utils/fetchPosts";
import ClientComponent from "@/components/QaClientComponent";
import { ShieldQuestion,Pencil,UsersRound } from 'lucide-react';
import Link from "next/link";

export default async function Home() {
  // Fetch posts on the server
  const posts = await fetchPosts();

  return (
    <div className="container mx-0 sm:mx-auto mt-16 px-0 sm:px-4 pb-8">
      <header className="flex justify-between items-center pt-2 p-4 shadow mb-4 dark:bg-gray-800">
        <div className="flex">
          <ShieldQuestion className="dark:text-gray-100 cursor-pointer" />
          <span className="dark:text-gray-100 cursor-pointer">Ask</span>
        </div>

        <div>
          <Link href="/post-upload" className="flex">
            <Pencil className="dark:text-gray-100 cursor-pointer" />
            <span className="dark:text-gray-100 cursor-pointer">Post</span>
          </Link>
        </div>

        <div>
          <Link href="/groups" className="flex">
            <UsersRound className="dark:text-gray-100 cursor-pointer" />
            <span className="dark:text-gray-100 cursor-pointer">Groups</span>
          </Link>
        </div>
      </header>

      {/* Pass the fetched posts to the ClientComponent */}
      <ClientComponent initialPosts={posts} />
    </div>
  );
}