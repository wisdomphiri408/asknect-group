import supabase from "./supabase";

export const dislike = async (userId, postId) => {
  try {
    // Check if the user has already liked the post
    const { data: existingLike } = await supabase
      .from("post_likes")
      .select("*")
      .eq("user_id", userId)
      .eq("post_id", postId)
      .single();

    if (existingLike) {
      // Remove the like
      await supabase.from("post_likes").delete().eq("id", existingLike.id);
    }

    // Check if the user has already disliked the post
    const { data: existingDislike } = await supabase
      .from("post_dislikes")
      .select("*")
      .eq("user_id", userId)
      .eq("post_id", postId)
      .single();

    if (existingDislike) {
      // If already disliked, remove dislike
      await supabase.from("post_dislikes").delete().eq("id", existingDislike.id);
      return { action: "undisliked" };
    } else {
      // If not disliked, add dislike
      await supabase.from("post_dislikes").insert([{ user_id: userId, post_id: postId }]);
      return { action: "disliked" };
    }
  } catch (error) {
    console.error("Error in dislike action:", error);
    throw error;
  }
};