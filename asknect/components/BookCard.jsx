// components/BookCard.js
import Image from "next/image";
import { ArrowDownToLine, Heart } from 'lucide-react';

const BookCard = ({ book }) => {
  const { imageUrl, title, posterProfileImage, posterName, downloads, likes } = book;

  return (
// BookCard
<div className="bg-gray-50 dark:bg-gray-900 pt-4 rounded-lg flex-1 max-w-[300px]">
      {/* Top Section: Image and Title */}
      <div className="flex items-center flex-col">
        <div className="image-container w-20 h-[50px] flex justify-center items-center">
          <Image 
            src={imageUrl} 
            alt={title} 
            className="object-cover w-full h-full max-w-xs rounded-md" 
            width={150} 
            height={150} 
          />
        </div>
        <div>
          <h2 className="text-center text-sm font-semibold dark:text-white">{title}</h2>
        </div>

      </div>

      {/* Bottom Section: Poster Info, Downloads, Likes, and Buttons */}
      <div className="bottom-section flex flex-col gap-2">
        {/* Poster Info */}
        <div className="poster-info flex items-center gap-3">
          <Image src={posterProfileImage} alt={posterName} width={25} height={25} className="rounded-full hidden sm:block" />
          <div>
            <p className="text-sm font-medium dark:text-white">{posterName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {downloads} Downloads · {likes} 🤍
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="actions flex items-center mt-2">
          <button className="p-2 rounded-md dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition hidden sm:block">
            <Heart width={15}/>
          </button>
          <button className="flex items-center px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition small-text">
            <ArrowDownToLine className="mr-2 h-4" /> Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
