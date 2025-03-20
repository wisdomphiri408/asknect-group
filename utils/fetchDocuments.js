// utils/fetchDocuments.js
import supabase from "./supabase";

// Fetch documents
export async function getDocuments() {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .limit(100004);

  if (error) {
    console.error("Error fetching documents:", error.message);
    return [];
  }

  return data;
}

// Fetch user info by user_id
export async function getUserInfo(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single(); // Use .single() if you expect only one user

  if (error) {
    console.error("Error fetching user info:", error.message);
    return null;
  }

  return data;
}