import Link from "next/link";
import Image from "next/image";

const videos = [
  { id: 1, title: "Introduction to React Hooks", duration: "15:30", views: 1200, img: "/assets/Thumbnails/human digestive.jpg" },
  { id: 2, title: "Advanced CSS Techniques", duration: "22:45", views: 980, img: "/assets/Thumbnails/Js for beginners.jpg" },
  { id: 3, title: "Data Structures in Python", duration: "18:20", views: 1500, img: "/assets/Thumbnails/newton's law.jpg" },
];

export default function RecentVideos() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold dark:text-white mb-4">Recent Questions</h2>
      <div className="space-y-4">
        {videos.map((video) => (
          <Link
            key={video.id}
            href={`/videos/${video.id}`}
            className="flex items-start space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition duration-150 ease-in-out"
          >
            <div className="relative w-24 h-16 flex-shrink-0">
              <Image
                src={`${video.img}?height=90&width=160&text=Video ${video.id}`}
                alt={video.title}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{video.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {video.duration} • {video.views} views
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/qa" className="block text-center text-indigo-600 dark:text-indigo-400 hover:underline mt-4">
        View all Questions
      </Link>
    </div>
  );
}