'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import supabase from "@/utils/supabase";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
  
    // Sign up the user
    const { data, error: SignUperror } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (SignUperror) {
      setError(SignUperror.message);
      return;
    }
  
    const user = data.user;
    if (!user) {
      setError("User registration failed.");
      return;
    }
  
    // Extract username from email
    const username = email.split("@")[0];
  
    // Save user details in the database
    const { error: insertError } = await supabase
      .from("users")
      .insert([{ id: user.id, email, username }]);
  
    if (insertError) {
      setError("Failed to save user data. Please try again.");
      return;
    }
  
    alert("Please verify your email.");
    router.push("/auth/signin");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Sign Up
        </h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <input
              type="password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="dark:text-white mt-2">
          already have an account <Link href='/auth/signin' className="text-blue-500 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}