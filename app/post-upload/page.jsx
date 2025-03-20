"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { getCurrentUserId } from "../../utils/auth";
import supabase from "../../utils/supabase";
import TiptapEditor from "@/components/TiptapEditor";
import Loader from "@/components/Loader"; // Import the Loader component

const PostPage = () => {
  const [editorValue, setEditorValue] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchUser = async () => {
      const userId = await getCurrentUserId();
      setUserId(userId);
    };
    fetchUser();
  }, []);

  const generateSlug = async (title) => {
    let slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    // Check for existing slugs and append a random suffix if necessary
    const { data: existingPosts, error } = await supabase
      .from("posts")
      .select("slug")
      .ilike("slug", `${slug}%`);

    if (error) {
      console.error("Error checking existing slugs:", error.message);
      throw new Error("Failed to generate slug");
    }

    if (existingPosts.length > 0) {
      const randomSuffix = Math.floor(100 + Math.random() * 900);
      slug = `${slug}-${randomSuffix}`;
    }

    return slug;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("You must be logged in to submit a post.");
      return;
    }

    setIsSubmitting(true); // Set loading state
    setSuccessMessage(""); // Clear any previous success message

    try {
      // Generate a unique slug
      const slug = await generateSlug(title);

      // Insert the post into the database
      const { error: insertError } = await supabase.from("posts").insert([
        {
          title,
          description: editorValue,
          slug,
          user_id: userId,
          tags: tags.join(",").toLowerCase(),
          likes_count: 0,
          dislikes_count: 0,
          views_count: 0,
          followers_count: 0,
          answers_count: 0,
        },
      ]);

      if (insertError) {
        console.error("Error submitting post:", insertError.message);
        setSuccessMessage("Failed to publish post. Please try again.");
        return;
      }

      // Set success message
      setSuccessMessage("Post published successfully!");

      // Redirect to the home page after 2 seconds
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error submitting post:", error);
      setSuccessMessage("Failed to publish post. Please try again.");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <div className="mt-20 mb-6 px-1">
      <h4 className="text-center dark:text-white">Create a Post</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="dark:text-white">Title:</label>
          <input
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="outline-none dark:text-white dark:bg-gray-900 is-editor-empty"
          />
        </div>
        <div className="form-field">
          <label className="dark:text-white">Tags:</label>
          <input
            type="text"
            placeholder="Enter tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value.split(","))}
            className="outline-none dark:text-white dark:bg-gray-900 is-editor-empty"
          />
        </div>

        <div className="form-field">
          <label className="dark:text-white">Content:</label>
          <TiptapEditor
            value={editorValue}
            onChange={setEditorValue}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="p-2 bg-green-400 text-white"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? (
              <div className="flex gap-2">
                <Loader />
                Posting... .don't refresh
              </div>
            ) :"Submit Post"}
          </button>
          {successMessage && (
            <span className="text-green-500">{successMessage}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostPage;