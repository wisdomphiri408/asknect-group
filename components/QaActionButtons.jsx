"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, UserPlus } from "lucide-react";
import { getCurrentUserId } from "@/utils/auth";

const QaActionButtons = ({ question }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(question.followers_count || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(question.likes_count || 0);
  const [isDisliked, setIsDisliked] = useState(false);
  const [dislikesCount, setDislikesCount] = useState(question.dislikes_count || 0);
  const [userId, setUserId] = useState(null);

  // Fetch user ID
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getCurrentUserId();
      setUserId(id);
    };

    fetchUserId();
  }, []);

  // Handle follow/unfollow
  const handleFollow = async () => {
    if (!userId) {
      console.error("No user ID found. User might not be logged in.");
      return;
    }

    // TODO: Implement follow/unfollow logic
    console.log("Follow/Unfollow clicked");
  };

  // Handle like/unlike
  const handleLike = async () => {
    if (!userId) {
      console.error("No user ID found. User might not be logged in.");
      return;
    }

    // TODO: Implement like/unlike logic
    console.log("Like/Unlike clicked");
  };

  // Handle dislike/undislike
  const handleDislike = async () => {
    if (!userId) {
      console.error("No user ID found. User might not be logged in.");
      return;
    }

    // TODO: Implement dislike/undislike logic
    console.log("Dislike/Undislike clicked");
  };

  return (
    <div className="flex items-center justify-between mt-4 px-4 pb-3">
      {/* Like Button */}
      <button
        className={`flex items-center ${isLiked ? "text-blue-500" : "dark:text-gray-300"} hover:text-blue-500`}
        onClick={handleLike}
      >
        <ThumbsUp className="w-5 h-5 mr-1" /> {likesCount}
      </button>

      {/* Dislike Button */}
      <button
        className={`flex items-center ${isDisliked ? "text-red-500" : "dark:text-gray-300"} hover:text-red-500`}
        onClick={handleDislike}
      >
        <ThumbsDown className="w-5 h-5 mr-1" /> {dislikesCount}
      </button>

      {/* Answers Button */}
      <button className="flex items-center text-gray-500 hover:text-green-500">
        <MessageSquare className="w-5 h-5 mr-1 dark:text-gray-300" /> <span className="dark:text-gray-300">{question.answers}</span>
      </button>

      {/* Follow Button */}
      <button
        className={`flex items-center ${isFollowing ? "text-yellow-500" : "dark:text-gray-300"} hover:text-yellow-500`}
        onClick={handleFollow}
        disabled={!userId}
      >
        {isFollowing ? (
          "Unfollow"
        ) : (
          <>
            <UserPlus className="w-5 h-5 mr-1" /> Follow
          </>
        )} ({followersCount})
      </button>
    </div>
  );
};

export default QaActionButtons;