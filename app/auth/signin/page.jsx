"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/utils/supabase";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Handle Magic Link Sign-in
  const handleMagicLink = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email for the magic link!");
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
  
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  
    if (error) {
      setError(error.message);
      return;
    }
  
    // Listen for authentication state change
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const user = session.user;
  
        // Step 1: Check if the user already exists in the `users` table
        const { data: existingUser, error: fetchError } = await supabase
          .from("users")
          .select("id")
          .eq("email", user.email)
          .single();
  
        if (fetchError && fetchError.code !== "PGRST116") {
          setError(fetchError.message);
          return;
        }
  
        // Step 2: If user is new, insert them into the `users` table
        if (!existingUser) {
          // Extract username from email (before the @ symbol)
          const username = user.email.split('@')[0]; // This is the part before the "@"
  
          const { error: insertError } = await supabase.from("users").insert([
            {
              username: username, // Use email root as the username
              email: user.email, // Store email
            },
          ]);
  
          if (insertError) {
            setError(insertError.message);
            return;
          }
        }
  
        // Redirect to home or dashboard
        router.push("/");
      }
    });
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-semibold text-center mb-4 dark:text-white">
          Sign In
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && (
          <p className="text-green-500 text-sm text-center">{message}</p>
        )}

        <form onSubmit={handleMagicLink} className="flex flex-col gap-3">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Send Magic Link
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-3 p-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
        >
          Sign in with Google
        </button>

        <p className="text-sm text-center mt-3 dark:text-white">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
