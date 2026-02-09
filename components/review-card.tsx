import { Review } from "@/lib/data";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { User } from "lucide-react";
import StarRating from "./star-rating";
import Link from "next/link";

const ReviewCard = (review: Review) => {
  return (
    <Card key={review.id} className="h-full w-full p-0 overflow-hidden">
      <CardContent className="p-4 md:p-4">
        <div className="flex gap-2 md:gap-4 items-center flex-col md:flex-row">
          <div className="rounded-full flex items-center justify-center w-fit h-fit  p-2 border">
            <User className="size-3 md:size-6" />
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href={`/model/${review.modelName}`}
              className="font-semibold hover:underline text-sm md:text-base"
            >
              {review.modelName}
            </Link>
            <span className="font-semibold hidden md:block">
              <StarRating rating={Number(review.starsCount)} />
            </span>
          </div>
          <span className="font-semibold block md:hidden">
            <StarRating rating={Number(review.starsCount)} />
          </span>
        </div>
        <div className="text-xs mt-2 text-center md:text-start">
          <span className="italic ">&quot; {review.reviewMessage} &quot;</span>
        </div>
        <div className="text-xs mt-2 text-center md:text-end italic">
          Review by <span className="font-semibold">{review.reviewerName}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
