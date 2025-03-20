import Link from "next/link";
import Image from "next/image";
import { fetchTopPosts } from '@/utils/fetchPosts';

export default async function TopPosts() {
  const posts = await fetchTopPosts();
  console.log("Fetched top posts:", posts); // Debugging: Log the fetched posts

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-xl dark:text-white font-semibold mb-4">Top Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/qa/posts/${post.slug}`}
            className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition duration-150 ease-in-out"
          >
          {/* Conditionally render the image container only if post.picture exists */}
          {post.picture && (
            <div className="relative w-24 h-16 flex-shrink-0">
              <Image
                src={post.picture}
                alt={post.questionTitle}
                fill
                className="rounded object-cover"
                />
            </div>
          )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {post.questionTitle}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {post.likes_count} likes • {post.answers} comments
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/qa"
        className="block text-center text-indigo-600 dark:text-indigo-400 hover:underline mt-4"
      >
        View all questions
      </Link>
    </div>
  );
}