"use client";

import { useRouter } from "next/navigation";

const GoogleLoginButton = () => {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/google");
  
      // Check if the response status is ok
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
  
      const data = await res.json();
  
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };
  

  return <button onClick={handleLogin}>Sign in with Google</button>;
};

export default GoogleLoginButton;
