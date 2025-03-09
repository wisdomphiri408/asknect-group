'use client'
import Image from "next/image";
import Link from "next/link";
import { useSession } from '@/context/SessionContext';

export default function FeaturedContent() {
  const { session, loading } = useSession();

  if(loading){
    return<p>Loading...</p>
  }

  return (
    <div className="bg-white dark:bg-gray-800 mt-16 rounded-none sm:rounded-xl shadow-md overflow-hidden">
      <div className="relative h-64 sm:h-80">
        <Image
          src="/assets/icons/enginnering.jpg?height=400&width=800"
          alt="Featured content"
          layout="fill"
          objectFit="cover"
          className="rounded-none sm:rounded-xl"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="p-4 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Ask. Share. Collaborate. Learn Together!
            </h2>
            <p className="text-gray-200 mb-4">
              Whether you're a student, teacher, or lifelong learner, this is your space to ask questions, share documents, and create groups for seamless collaboration. Join a community built for knowledge-sharing!
            </p>
            {
              session?(
                <>
                  <Link
                    href="/groups" // Replace with the actual path to your group pages
                    className="inline-block bg-indigo-600 hover:text-white text-white font-semibold py-2 px-4 rounded"
                  >
                    Create or Join a Group
                  </Link>
                </>
              ):(
                <>
                  <Link
                    href="/auth/signin"
                    className="inline-block bg-indigo-600 hover:text-white text-white font-semibold py-2 px-4 rounded"
                  >
                    Join for Free
                  </Link>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}