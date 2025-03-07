'use client'; // Mark this as a Client Component

import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '@/utils/supabase';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for session data before fetching from Supabase
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      setSession(JSON.parse(storedSession));
      setLoading(false); // Skip the loading state if session is already in localStorage
    } else {
      // If no session in localStorage, fetch it from Supabase
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
        if (session) {
          localStorage.setItem('session', JSON.stringify(session)); // Store session in localStorage
        }
      });
    }

    // Listen for authentication state changes and update session in localStorage
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        localStorage.setItem('session', JSON.stringify(session)); // Store session in localStorage on change
      } else {
        localStorage.removeItem('session'); // Remove session from localStorage on logout
      }
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
