import CTAHome from "@/components/cta-home";
import HomeTags from "@/components/home-tags";
import LatestReviews from "@/components/latest-reviews";
import TopTenModels from "@/components/topTenModels";

export default function Home() {
  return (
    <div className="flex flex-col h-fit w-full bg-primary/5">
      <HomeTags />
      <TopTenModels />
      <LatestReviews />
      <CTAHome />
    </div>
  );
}
