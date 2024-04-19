"use client";
// `app/page.tsx` is the UI for the `/` URL

import { useEffect } from "react";
// import { useRouter } from "next/router";
// Import the useRouter hook from 'next/router' instead of 'next/navigation'
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const userId = getCookie("userId");

    if (userId) {
      router.push("/site");
    } else {
      router.push("/auth");
    }
  }, [router]); // Add router to the dependency array

  return null; // You can return null here since the navigation happens inside useEffect
}
