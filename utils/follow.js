import supabase from "./supabase";

export const follow = async (followerId, followedId) => {
  try {
    // Check if the follower is already following the user
    const { data: existingFollow, error: fetchError } = await supabase
      .from("user_followers")
      .select("*")
      .eq("follower_id", followerId)
      .eq("followed_id", followedId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw new Error("Failed to check follow status");
    }

    if (existingFollow) {
      // If already following, unfollow
      const { error: deleteError } = await supabase
        .from("user_followers")
        .delete()
        .eq("id", existingFollow.id);

      if (deleteError) {
        throw new Error("Failed to unfollow");
      }

      return { action: "unfollowed" };
    } else {
      // If not following, follow
      const { error: insertError } = await supabase
        .from("user_followers")
        .insert([{ follower_id: followerId, followed_id: followedId }]);

      if (insertError) {
        throw new Error("Failed to follow");
      }

      return { action: "followed" };
    }
  } catch (error) {
    console.error("Error in follow action:", error);
    throw error;
  }
};