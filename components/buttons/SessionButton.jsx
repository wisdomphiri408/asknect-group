'use client'

import Link from "next/link";
import { useSession } from '@/context/SessionContext';
import Loader from "@/components/Loader"; // Import the Loader component

export default function SessionButton() {
  const { session, loading } = useSession();

  if (loading) {
    return <p className='text-green-600'><Loader /></p>;
  }

  return (
    <>
      {session ? (
        <Link
          href="/groups" // Replace with the actual path to your group pages
          className="inline-block bg-indigo-600 hover:text-white text-white font-semibold py-2 px-4 rounded"
        >
          Create or Join a Group
        </Link>
      ) : (
        <Link
          href="/auth/signin"
          className="inline-block bg-indigo-600 hover:text-white text-white font-semibold py-2 px-4 rounded"
        >
          Join for Free
        </Link>
      )}
    </>
  );
}