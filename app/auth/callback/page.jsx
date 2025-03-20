'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/utils/supabase';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error handling callback:', error.message);
        router.push('/sign-in'); // Redirect to sign-in page if there's an error
      } else if (data.session) {
        router.push('/'); // Redirect to homepage after successful sign-in
      }
    };

    handleCallback();
  }, [router]);

  return <p>Loading...</p>;
}