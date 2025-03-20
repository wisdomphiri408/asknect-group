export const like = async (userId, postId) => {
  try {
    // Check if the user has already liked the post
    const { data: existingLike } = await supabase
      .from("post_likes")
      .select("*")
      .eq("user_id", userId)
      .eq("post_id", postId)
      .single();

    if (existingLike) {
      // If already liked, remove like
      console.log("Deleting like for post:", postId, "by user:", userId); // Debugging
      await supabase.from("post_likes").delete().eq("id", existingLike.id);

      // Decrement likes_count in the posts table
      await supabase
        .from("posts")
        .update({ likes_count: supabase.rpc("decrement") })
        .eq("id", postId);

      return { action: "unliked" };
    } else {
      // If not liked, like the post
      console.log("Inserting new like for post:", postId, "by user:", userId); // Debugging
      await supabase.from("post_likes").insert([{ user_id: userId, post_id: postId }]);

      // Increment likes_count in the posts table
      await supabase
        .from("posts")
        .update({ likes_count: supabase.rpc("increment") })
        .eq("id", postId);

      return { action: "liked" };
    }
  } catch (error) {
    console.error("Error in like action:", error);
    throw error;
  }
};