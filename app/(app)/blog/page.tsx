import ComingSoon from "@/components/coming-soon";
import ImagekitUpload from "@/components/ImagekitUpload";
import ImagekitView from "@/components/ImagekitView";

const BlogPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 py-16">
      <ComingSoon />

      <ImagekitView src="default-image.jpg" alt="default-image" />
      <ImagekitView
        src="escorts/igor-starkov-P-khwx2l5B0-unsplash.jpg"
        alt="igor-starkov-P-khwx2l5B0-unsplash"
        className="rounded-xl m-4"
        loading="lazy"
        transformation={[
          {
            height: "500",
            width: "500",
          },
        ]}
      />

      <div className="flex flex-col items-center justify-center">
        <ImagekitUpload />
      </div>
    </div>
  );
};

export default BlogPage;
