'use client'; // Mark this as a Client Component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/utils/supabase';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // User is signed in, redirect to dashboard or home page
        router.push('/');
      } else {
        // User is signed out, redirect to sign-in page
        router.push('/auth/signin');
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, [router]);

  return null;
};

export default useAuth;