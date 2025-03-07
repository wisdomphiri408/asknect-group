'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Link from "next/link";
import supabase from "@/utils/supabase"; 
import bcrypt from "bcryptjs";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize useRouter

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      // Check if the email already exists
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("email")
        .eq("email", formData.email)
        .single();
  
      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }
  
      if (existingUser) {
        setError("User already signed up. Please log in.");
        return;
      }
  
      // Sign up user
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { username: formData.username },
          redirectTo: "http://localhost:3000/auth/confirm", // Redirects to the confirmation page
        },
      });
      
      if (error) throw error;
  
      // Store user in database
      const { error: dbError } = await supabase.from("users").insert([
        {
          username: formData.username,
          email: formData.email,
        },
      ]);
  
      if (dbError) throw dbError;
  
      alert("Sign-up successful! Check your email to verify your account.");
      router.push("/auth/signin"); // Redirect to login page
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-semibold text-center mb-4 dark:text-white">Sign Up</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-black focus:ring-2 focus:ring-blue-500 dark:text-white" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-black focus:ring-2 focus:ring-blue-500 dark:text-white" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg dark:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg dark:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" required />
          <button type="submit" className="w-full mt-4 p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">Sign up</button>
        </form>
        <p className="text-sm text-center mt-3 dark:text-white">
          Already have an account? <Link href="/auth/signin" className="text-blue-500 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
