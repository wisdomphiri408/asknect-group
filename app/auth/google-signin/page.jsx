'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/utils/supabase';
import { handleGoogleUser } from '@/utils/handleGoogleUser'; // Import the function

export default function GoogleSignIn() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  useEffect(() => {
    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Handle the user's Google profile data
        await handleGoogleUser(session.user);

        // Redirect to the homepage
        router.push('/');
      }
    });

    // Cleanup the listener
    return () => authListener.subscription.unsubscribe();
  }, [router]);

  return (
    <div>
      <div className=" pt-8">
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-700 dark:hover:bg-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24"
            height="24"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.6 4.1 29.6 2 24 2 12.9 2 4 10.9 4 22s8.9 20 20 20c11.1 0 20-8.9 20-20 0-1.3-.1-2.6-.4-3.9z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 12.6 19.1 8 24 8c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.6 4.1 29.6 2 24 2 16.3 2 9.7 6.6 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-1.7 1.2-3.8 1.9-6.2 1.9-5.2 0-9.6-3.3-11.3-8l-6.6 4.8C9.7 41.4 16.3 46 24 46z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.2 5.2C41.1 38.1 44 32.1 44 22c0-1.3-.1-2.6-.4-3.9z"
            />
          </svg>
          Sign In with Google
        </button>
      </div>
    </div>
  );
}