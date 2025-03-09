import FeaturedContent from "@/components/FeaturedContent";
import RecentVideos from "@/components/RecentVideos";
import PopularDocuments from "@/components/PopularDocuments";
import TopQuestions from "@/components/TopQuestions";

export default function Home() {
  return (
    <div className="grid  grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3">
      <div className="md:col-span-2 lg:col-span-3">
        <FeaturedContent />
      </div>
      <div>
        <RecentVideos />
      </div>
      <div>
        <PopularDocuments />
      </div>
      <div>
        <TopQuestions />
      </div>
    </div>
  );
}

