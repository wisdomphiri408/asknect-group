import supabase from "./supabase";

export async function toggleLike(userId, documentId) {
  console.log(documentId);
  console.log(userId);

  // Check if the user has already liked the document
  const { data: existingLike, error: fetchError } = await supabase
    .from("document_likes")
    .select("*")
    .eq("user_id", userId)
    .eq("document_id", documentId)
    .single();
    

  if (fetchError && !fetchError.message.includes("multiple (or no) rows")) {
    console.error("Error checking like:", fetchError.message);
    return null;
  }

  if (existingLike) {
    // If the user has already liked the document, remove the like
    const { error: deleteError } = await supabase
      .from("document_likes")
      .delete()
      .eq("id", existingLike.id);

    if (deleteError) {
      console.error("Error removing like:", deleteError.message);
      return null;
    }

    // Decrement likes_count in the documents table
    const { data: document, error: decrementError } = await supabase
      .from("documents")
      .select("likes_count")
      .eq("id", documentId)
      .single();

    if (decrementError) {
      console.error("Error fetching document:", decrementError.message);
      return null;
    }

    const updatedLikesCount = document.likes_count - 1;

    const { error: updateError } = await supabase
      .from("documents")
      .update({ likes_count: updatedLikesCount })
      .eq("id", documentId);

    if (updateError) {
      console.error("Error decrementing likes count:", updateError.message);
      return null;
    }

    console.log("Like removed successfully!");
    return "removed";
  } else {
    // If the user hasn't liked the document, add a like
    const { error: insertError } = await supabase
      .from("document_likes")
      .insert([{ user_id: userId, document_id: documentId }]);

    if (insertError) {
      console.error("Error adding like:", insertError.message);
      return null;
    }

    console.log('documentId', documentId);
    // Increment likes_count in the documents table
    const { data: document, error: incrementError } = await supabase
      .from("documents")
      .select("likes_count")
      .eq("id", documentId)
      .single();

    if (incrementError) {
      console.error("Error fetching document:", incrementError.message);
      return null;
    }

    console.log("Fetched Document:", document.likes_count);
    console.log(typeof documentId); // Should be "string"

    const updatedLikesCount = document.likes_count + 1;

    console.log
    const { data, error: updateError } = await supabase
    .from("documents")
    .update({ likes_count: updatedLikesCount })
    .eq("id", documentId)
    .select();
  
  console.log("Updated Document:", data); // Check if it returns the updated row
  if (updateError) {
    console.error("Error updating likes count:", updateError.message);
  }
  

    console.log("Like added successfully!");
    return "added";
  }
}