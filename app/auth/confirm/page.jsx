import { redirect } from 'next/navigation';
import supabase from '@/utils/supabase';

export default async function ConfirmPage({ searchParams }) {
  const { token_hash, type } = searchParams;

  if (token_hash && type === 'email') {
    try {
      const { error } = await supabase.auth.verifyOtp({ token_hash, type: 'email' });

      if (error) {
        console.error('Error verifying email:', error.message);
        redirect('/auth/signin'); // Redirect to sign-in page if there's an error
      } else {
        // Email verified successfully, redirect to dashboard or home page
        redirect('/dashboard');
      }
    } catch (err) {
      console.error('Error verifying email:', err.message);
      redirect('/auth/signin');
    }
  }

  // If no token_hash or type, redirect to sign-in page
  redirect('/auth/signin');
}