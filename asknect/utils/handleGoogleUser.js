import supabase  from '@/utils/supabase';

export const handleGoogleUser = async (user) => {
  // Extract the username from the email (e.g., "test@gmail.com" -> "test")
  const username = user.email.split('@')[0];

  // Check if the user already exists in the `users` table
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('email', user.email)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') { // Ignore "No rows found" error
    console.error('Error fetching user:', fetchError.message);
    return;
  }

  // If the user doesn't exist, insert them into the `users` table
  if (!existingUser) {
    const { error: insertError } = await supabase
      .from('users')
      .insert([
        {
          id: user.id, // Link to the auth user
          email: user.email,
          username,
          created_at: new Date().toISOString(),
        },
      ]);

    if (insertError) {
      console.error('Error inserting user:', insertError.message);
    } else {
      console.log('User added to the database:', user.email);
    }
  } else {
    console.log('User already exists:', user.email);
  }
};