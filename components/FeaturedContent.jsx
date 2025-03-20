import Image from "next/image";
import SessionButton from './buttons/SessionButton'; // Import the SessionButton component

export default function FeaturedContent() {
  return (
    <div className="bg-white dark:bg-gray-800 mt-16 rounded-none sm:rounded-xl shadow-md overflow-hidden">
      <div className="relative h-64 sm:h-80">
        <Image
          src="/assets/icons/enginnering.jpg" // Remove query parameters
          alt="Featured content"
          fill // Use the `fill` prop instead of `layout="fill"`
          sizes="(max-width: 768px) 100vw, 800px" // Add `sizes` for responsive images
          priority // Use `priority` for above-the-fold images
          placeholder="blur" // Add `placeholder="blur"` if you want a blurred placeholder
          blurDataURL="data:image/jpg;base64,..." // Provide a base64-encoded image for the blur effect
          className="rounded-none sm:rounded-xl object-cover" // Add `object-cover` for the same effect as `objectFit="cover"`
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="p-4 sm:p-6">
            <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Ask. Share. Collaborate. Learn Together!
            </h4>
            <p className="text-gray-200 mb-4">
            Empowering learning through collaboration and knowledge-sharing.
            </p>
            <SessionButton /> {/* Use the SessionButton component here */}
          </div>
        </div>
      </div>
    </div>
  );
}