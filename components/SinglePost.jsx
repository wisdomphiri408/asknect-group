// app/components/SinglePost.jsx
'use client';
import { MessageCircle, ThumbsUp, ThumbsDown, Share, Flag, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { like } from "@/utils/like";
import { dislike } from "@/utils/dislike";
import { getCurrentUserId } from "@/utils/auth";
import supabase from "@/utils/supabase";
import { follow } from '@/utils/follow';

const SinglePost = ({ post, relatedPosts }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [isDisliked, setIsDisliked] = useState(false);
  const [dislikesCount, setDislikesCount] = useState(post.dislikes_count || 0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(post.followers_count || 0);
  const [userId, setUserId] = useState(null);

  const checkIfLiked = async (userId, postId) => {
    try {
      const { data: existingLike, error } = await supabase
        .from("post_likes")
        .select("*")
        .eq("user_id", userId)
        .eq("post_id", postId)
        .single();

      if (error && error.code !== "PGRST116") {
        throw new Error("Failed to check like status");
      }

      return !!existingLike;
    } catch (error) {
      console.error("Error checking like status:", error);
      return false;
    }
  };

  const checkIfDisliked = async (userId, postId) => {
    try {
      const { data: existingDislike, error } = await supabase
        .from("post_dislikes")
        .select("*")
        .eq("user_id", userId)
        .eq("post_id", postId)
        .single();

      if (error && error.code !== "PGRST116") {
        throw new Error("Failed to check dislike status");
      }

      return !!existingDislike;
    } catch (error) {
      console.error("Error checking dislike status:", error);
      return false;
    }
  };

  const checkIfFollowing = async (followerId, followedId) => {
    try {
      const { data: existingFollow, error } = await supabase
        .from('user_followers')
        .select('*')
        .eq('follower_id', followerId)
        .eq('followed_id', followedId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw new Error('Failed to check follow status');
      }

      return !!existingFollow;
    } catch (error) {
      console.error('Error checking follow status:', error);
      return false;
    }
  };


  useEffect(() => {
    const fetchUserIdAndStatus = async () => {
      const id = await getCurrentUserId();
      setUserId(id);

      if (id) {
        const isPostLiked = await checkIfLiked(id, post.id);
        setIsLiked(isPostLiked);

        const isPostDisliked = await checkIfDisliked(id, post.id);
        setIsDisliked(isPostDisliked);
      const isFollowingAuthor = await checkIfFollowing(id, post.user_id);
      setIsFollowing(isFollowingAuthor);
      }
    };

    fetchUserIdAndStatus();
  }, [post.id]);

  const handleLike = async () => {
    if (!userId) {
      console.error("No user ID found. User might not be logged in.");
      return;
    }
  
    try {
      const result = await like(userId, post.id);
      setIsLiked(result.action === "liked");
      setLikesCount(result.likes_count); // Update likes count
      setIsDisliked(false); // Reset dislike state
      setDislikesCount(result.dislikes_count); // Update dislikes count
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };
  
  const handleDislike = async () => {
    if (!userId) {
      console.error("No user ID found. User might not be logged in.");
      return;
    }
  
    try {
      const result = await dislike(userId, post.id);
      setIsDisliked(result.action === "disliked");
      setDislikesCount(result.dislikes_count); // Update dislikes count
      setIsLiked(false); // Reset like state
      setLikesCount(result.likes_count); // Update likes count
    } catch (error) {
      console.error("Error handling dislike:", error);
    }
  };

  const handleFollow = async () => {
    if (!userId) {
      console.error('No user ID found. User might not be logged in.');
      return;
    }

    try {
      const result = await follow(userId, post.user_id);
      setIsFollowing(result.action === 'followed');
      setFollowersCount(result.followers_count);
    } catch (error) {
      console.error('Error handling follow:', error);
    }
  };

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Early return if post is not available
  if (!post) {
    return (
      <div className="container mx-auto p-4 mt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-blue-600">No pages available</h1>
          <p className="text-gray-600">The post you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  // Extract post data into variables for better readability
  const {
    profileImg,
    username,
    views = 0,
    questionTitle = post.title,
    description = { content: [] }, // Default to an empty array
    likes_count = post.likes_count,
    dislikes_count = post.dislikes_count,
    answers = post.answers_count,
    followers_count,
  } = post;

  // Ensure description.content is an array
  const contentNodes = Array.isArray(description.content) ? description.content : [];

  // Extract related posts data
  const formattedRelatedPosts = relatedPosts.map((relatedPost) => ({
    id: relatedPost.id,
    slug: relatedPost.slug,
    profileImg: relatedPost.profileImg || "https://api.dicebear.com/7.x/bottts/svg?seed=DefaultUser",
    username: relatedPost.username || "Anonymous",
    views: relatedPost.views || 0,
    questionTitle: relatedPost.questionTitle || "No Title",
    questionDescription: relatedPost.questionDescription || "No description available",
  }));

  // Function to recursively render description content
  const renderDescriptionContent = (nodes) => {
    return nodes.map((node, index) => {
      if (node.type === "paragraph" || node.type === "heading") {
        return (
          <div key={index} className={node.type === "heading" ? "mb-4" : "mb-4"}>
            {node.content?.map((contentNode, contentIndex) => {
              if (contentNode.type === "text") {
                // Check for marks (italic, bold, underline, color, link, etc.)
                const isItalic = contentNode.marks?.some((mark) => mark.type === "italic");
                const isBold = contentNode.marks?.some((mark) => mark.type === "bold");
                const isUnderline = contentNode.marks?.some((mark) => mark.type === "underline");
                const colorMark = contentNode.marks?.find((mark) => mark.type === "textStyle");
                const linkMark = contentNode.marks?.find((mark) => mark.type === "link");

                // Force default text color in dark mode
                const textColor = colorMark?.attrs?.color || "inherit"; // Default to inherit if no color is specified
                const darkModeTextColor = "dark:text-gray-100"; // Force light text in dark mode

                // Render text with styles
                const textElement = (
                  <span
                    key={contentIndex}
                    className={` ${isItalic ? "italic" : ""} ${isBold ? "font-bold" : ""} ${isUnderline ? "underline" : ""} ${darkModeTextColor}`}
                    style={{ color: textColor }} // Apply the color dynamically
                  >
                    {contentNode.text}
                  </span>
                );

                // Wrap in a link if a link mark is present
                if (linkMark) {
                  return (
                    <a
                      key={contentIndex}
                      href={linkMark.attrs.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {textElement}
                    </a>
                  );
                }

                return textElement;
              }
              if (contentNode.type === "image") {
                return (
                  <div key={contentIndex} className="flex justify-center mb-6 w-full mx-0 px-0">
                    <Image
                      src={contentNode.attrs.src}
                      alt="Post Image"
                      width={500}
                      height={300}
                      className="w-full max-w-[500px] h-auto"
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        );
      }
      if (node.type === "image") {
        return (
          <div key={index} className="flex justify-center mb-6 w-full mx-0 px-0">
            <Image
              src={node.attrs.src}
              alt="Post Image"
              width={500}
              height={300}
              className="w-full max-w-[500px] h-auto"
            />
          </div>
        );
      }
      if (node.type === "bulletList" || node.type === "orderedList") {
        const ListTag = node.type === "bulletList" ? "ul" : "ol";
        return (
          <ListTag key={index} className={node.type === "bulletList" ? "list-disc pl-6 mb-4" : "list-decimal pl-6 mb-4"}>
            {node.content?.map((listItem, listItemIndex) => (
              <li key={listItemIndex}>
                {renderDescriptionContent(listItem.content)}
              </li>
            ))}
          </ListTag>
        );
      }
      if (node.content) {
        // Recursively render nested content
        return <div key={index}>{renderDescriptionContent(node.content)}</div>;
      }
      return null;
    });
  };

  const isColorSensitive = (description) => {
    const sensitiveColors = ["#000000", "#ffffff"]; // Black or white
    let isSensitive = false;

    const checkNode = (node) => {
      if (node.type === "text" && node.marks) {
        const colorMark = node.marks.find((mark) => mark.type === "textStyle");
        if (colorMark && sensitiveColors.includes(colorMark.attrs?.color)) {
          isSensitive = true;
        }
      }
      if (node.content) {
        node.content.forEach(checkNode);
      }
    };

    description.content.forEach(checkNode);
    return isSensitive;
  };

  // In the SinglePost component
  const isSensitivePost = isColorSensitive(description);

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-0 mx-0 sm:p-4 mb-6">
      {/* Left Side: Post Details */}
      <div className="flex-1 flex-col">
        {/* Warning for color-sensitive posts */}
        {isSensitivePost && (
          <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700">
            <p>This post may be hard to read in some themes. Try changing the theme for better readability.</p>
          </div>
        )}

        {/* User Profile, Username, and Views */}
        <div className="flex flex-col mb-6">
          <div className="flex items-center gap-2">
            <Image
              src={profileImg}
              alt={username}
              width={30}
              height={30}
              className="rounded-full pl-2"
            />
            <h6 className="font-bold dark:text-gray-100">{username}</h6>
          </div>
          <div>
            <p className="text-sm text-gray-500 small-text ml-10">{views} views</p>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-xl px-2 font-bold mb-4 dark:text-gray-100">{questionTitle}</h4>

        {/* Description */}
        <div className="mb-4 dark:text-gray-300 px-1">
          {contentNodes.length > 0 ? (
            renderDescriptionContent(contentNodes)
          ) : (
            <p>No description available.</p>
          )}
        </div>

        {/* Actions: Likes, Dislikes, Comments, Follow, Report, Share */}
        <div className="flex justify-between items-center gap-6 px-2">
          <button className={`flex items-center gap-2 ${isLiked ? "text-blue-500" : "dark:text-gray-300"} hover:text-blue-500`}
            onClick={handleLike}>
            <ThumbsUp size={20} />
            <span>{likesCount}</span>
          </button>
          <button className={`flex items-center gap-2 ${isDisliked ? "text-red-500" : "dark:text-gray-300"} hover:text-red-500`}
            onClick={handleDislike}>
            <ThumbsDown size={20} />
            <span>{dislikesCount}</span>
          </button>
          <button className="flex items-center gap-2 hover:text-green-500 dark:text-gray-300">
            <MessageCircle size={20} />
            <span>{answers}</span>
          </button>
          <button className={`flex items-center gap-2 ${isFollowing ? 'text-yellow-500' : 'dark:text-gray-300'} hover:text-yellow-500`}
          onClick={handleFollow}
          disabled={!userId}>
            {isFollowing ? 'Unfollow' : 'Follow'} ({followersCount})
          </button>

          {/* Dropdown for Report and Share */}
          <div className="relative" ref={dropdownRef}>
            <MoreVertical
              size={20}
              onClick={toggleDropdown}
              className="cursor-pointer text-gray-500 hover:text-green-500"
            />

            {isDropdownOpen && (
              <div className="absolute bottom-8 right-0 bg-white border rounded-lg shadow-lg p-2 dark:bg-gray-900">
                <button className="flex items-center gap-2 w-full text-left p-2 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-600">
                  <Share size={16} /> Share
                </button>
                <button className="flex items-center gap-2 w-full text-left p-2 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-600">
                  <Flag size={16} /> Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side: Related Posts */}
      <div className="lg:w-1/3 px-2">
        <h3 className="text-lg font-bold mb-4 dark:text-gray-100">More from {username}</h3>
        <div className="space-y-6 flex flex-col">
          {formattedRelatedPosts.map((relatedPost) => (
            <Link key={relatedPost.id} href={`/qa/posts/${relatedPost.slug}`}>
              <div className="cursor-pointer">
                <div className="flex items-center gap-4 mb-2">
                  <Image
                    src={relatedPost.profileImg}
                    alt={relatedPost.username}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <div>
                    <h5 className="text-base font-bold dark:text-gray-100">{relatedPost.username}</h5>
                    <p className="text-sm text-gray-500">
                      {relatedPost.views} views
                    </p>
                  </div>
                </div>
                <h6 className="font-semibold dark:text-gray-100">{relatedPost.questionTitle}</h6>
                <p className="text-sm text-gray-600 line-clamp-2 dark:text-gray-300 border-b-2">
                  {relatedPost.questionDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;