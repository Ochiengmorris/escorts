import { Reviews } from "@/lib/data";
import React from "react";
import ReviewCard from "./review-card";

const LatestReviews = () => {
  return (
    <div className="h-fit w-full p-4 mt-4 flex flex-col gap-2">
      <h3 className="font-bold uppercase">Latest Reviews</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </div>
  );
};

export default LatestReviews;
