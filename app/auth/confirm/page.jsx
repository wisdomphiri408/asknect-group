'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/utils/supabase";

export default function Confirm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleConfirmation = async () => {
      setError("");
      setSuccess("");

      if (!token_hash || type !== "email") {
        setError("Invalid confirmation link.");
        setLoading(false);
        return;
      }

      try {
        // Verify the OTP
        const { data, error: confirmationError } = await supabase.auth.verifyOtp({
          type: "signup",
          token_hash,
        });

        if (confirmationError) {
          setError(confirmationError.message);
        } else {
          // Extract the username from the email
          const email = data.user?.email;
          const username = email?.split("@")[0]; // Extract the part before the "@"

          // Insert the user's email and username into the `users` table
          const { error: insertError } = await supabase
            .from("users")
            .insert([{ id,email, username }]);

          if (insertError) {
            setError("Failed to save user data. Please try again.");
          } else {
            setSuccess("Email confirmed successfully!");
            setTimeout(() => {
              router.push("/dashboard");
            }, 3000); // Redirect after 3 seconds
          }
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    handleConfirmation();
  }, [token_hash, type, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
        {loading ? (
          <p className="text-gray-700 dark:text-gray-300">Confirming your email...</p>
        ) : error ? (
          <p className="text-red-500">Error confirming email: {error}</p>
        ) : (
          <>
            <p className="text-green-500">{success}</p>
            <p className="text-gray-700 dark:text-gray-300">Redirecting to the dashboard...</p>
          </>
        )}
      </div>
    </div>
  );
}