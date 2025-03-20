// lib/supabase-server.js
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const supabaseServer = () => {
  const cookieStore = cookies();
  return createServerComponentClient({ cookies: () => cookieStore });
};