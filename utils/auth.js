// utils/auth.js
import supabase from './supabase';

export async function getCurrentUserId() {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching current user:', error.message);
    return null;
  }

  return user?.id;
}