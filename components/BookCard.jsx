// components/BookCard.jsx
'use client';
import Image from 'next/image';
import { ArrowDownToLine, Heart } from 'lucide-react';
import { useLike } from '@/hooks/useLike';
import Link from 'next/link';

const BookCard = ({ book }) => {
  const { isLiked, likesCount, loading, toggleLike } = useLike(book.id);

  const handleLike = async () => {
    await toggleLike();
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 pt-4 rounded-lg flex-1 max-w-[300px]">
      {/* Top Section: Image and Title */}
      <Link href={`/documents/${book.slug}`}>
      <div className="flex items-center flex-col">
        <div className="image-container w-20 h-[50px] flex justify-center items-center">
          {book.cover_image_url ? (
            <Image
              src={`https://civirsurnnllejysilct.supabase.co/storage/v1/object/public/cover-images/${book.cover_image_url}`}
              alt={book.title}
              className="object-cover w-full h-full max-w-xs rounded-md"
              width={150}
              height={150}
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">No Image</span>
            </div>
          )}
        </div>
        <div>
          <h4 className="text-center text-sm font-semibold dark:text-gray-100">{book.title}</h4>
        </div>
      </div>
      </Link>
      {/* Bottom Section: Poster Info, Downloads, Likes, and Buttons */}
      <div className="bottom-section flex flex-col gap-2 p-4">
        {/* Poster Info */}
        <div className="poster-info flex items-center gap-3">
          <Image
            src={book.user?.profile_image_url || `https://api.dicebear.com/7.x/bottts/svg?seed=DefaultUser`}
            alt={book.user?.username || 'Unknown User'}
            width={25}
            height={25}
            className="rounded-full hidden sm:block"
          />
          <div>
            <p className="text-sm font-medium dark:text-white">{book.user?.username || 'Unknown User'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {book.downloads_count} Downloads · {likesCount} 🤍
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="actions flex items-center mt-2">
          <button onClick={handleLike} disabled={loading} className='dark:text-white'>
            <Heart
              width={15}
              className={
                isLiked
                  ? 'fill-black dark:fill-white' // Black in light mode, white in dark mode
                  : 'fill-none' // No fill when not liked
              }
            />
          </button>
          <a
            href={`https://civirsurnnllejysilct.supabase.co/storage/v1/object/public/documents/${book.file_url}`}
            target="_blank"
            download={book.title}
            className="flex items-center px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition small-text"
            aria-label="Download"
          >
            <ArrowDownToLine className="mr-2 h-4" /> Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;