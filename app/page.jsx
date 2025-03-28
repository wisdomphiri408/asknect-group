import FeaturedContent from "@/components/FeaturedContent";
import RecentPosts from "@/components/RecentPosts";
import PopularDocuments from "@/components/PopularDocuments";
import TopPosts from "@/components/TopPosts";

export default function Home() {
  return (
    <div className="grid  grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3">
      <div className="md:col-span-2 lg:col-span-3">
        <FeaturedContent />
      </div>
      <div>
        <RecentPosts />
      </div>
      <div>
        <PopularDocuments />
      </div>
      <div>
        <TopPosts />
      </div>
    </div>
  );
}

