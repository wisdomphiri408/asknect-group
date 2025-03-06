"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function GoogleAnalytics() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-7BVV4V4FDS");
  }, []);

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-7BVV4V4FDS"
      />
    </>
  );
}
