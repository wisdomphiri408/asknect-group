// components/QaClientComponent.js
"use client";

import { useState, useEffect } from "react";
import QuestionCard from "@/components/QuestionCard";
import Loader from "./Loader";

export default function ClientComponent({ initialPosts, query }) {
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Function to load more posts
  const loadMorePosts = async () => {
    const nextPage = page + 1;
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}&page=${nextPage}`);
    const { posts: newPosts } = await response.json();

    if (newPosts.length > 0) {
      setPosts((prev) => [...prev, ...newPosts]);
      setPage(nextPage);
    } else {
      setHasMore(false); // No more posts to load
    }
  };

  // Detect when the user scrolls to the bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, hasMore, query]);

  return (
    <div>
      <div className="columns-1 sm:columns-2 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="break-inside-avoid mb-4">
            <QuestionCard question={post} />
          </div>
        ))}
      </div>

      {hasMore && <p className="text-green-500"><Loader /></p>}
    </div>
  );
}