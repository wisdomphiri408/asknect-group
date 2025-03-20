// app/search/page.js
import ClientComponent from "@/components/QaClientComponent";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.query;

  if (!query) {
    return <div>No search query provided.</div>;
  }

  // Fetch filtered and sorted posts from the server
  const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/search?query=${encodeURIComponent(query)}`;
  const response = await fetch(apiUrl); // No need to disable caching
  const { posts: sortedPosts } = await response.json();

  console.log("Sorted Posts:", sortedPosts); // Log the data

  return (
    <div className="container mx-0 sm:mx-auto mt-16 px-0 sm:px-4 pb-8">
      <h1 className="text-2xl font-semibold dark:text-gray-100 mb-4">Search Results for "{query}"</h1>
      <ClientComponent initialPosts={sortedPosts} query={query} />
    </div>
  );
}