import Image from "next/image";


const VideoCard = ({ video }) => {
  return (
    <div className="videoCard p-0 sm:p-2 w-full">
      {/* YouTube Video Embed */}
      <div className="relative w-full aspect-video rounded-none sm:rounded-2xl overflow-hidden">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${video.videoId}?rel=0`}
          title={video.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      {/* Video Info */}
      <div className="flex mt-2 p-2">
        {/* Profile Picture */}
        <div className="p-2">
          <Image
            src={video.profile}
            alt="profile"
            width={30}
            height={30}
            className="rounded-full cursor-pointer"
          />
        </div>

        {/* Video Details */}
        <div className="ml-3">
          <h6 className="text-black dark:text-white font-semibold">
            {video.title}
          </h6>
          <div className="text-sm text-gray-500">{video.user}</div>
          <div className="text-sm text-gray-500">
            {video.post} • {video.likes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
