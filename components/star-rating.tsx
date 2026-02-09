import { Star } from "lucide-react";

const StarRating = ({ rating = 0 }) => {
  // Clamp rating between 0 and 5
  const clampedRating = Math.max(0, Math.min(5, rating));

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((index) => {
        const fillPercentage = Math.max(
          0,
          Math.min(1, clampedRating - index + 1)
        );

        return (
          <div key={index} className="relative size-5 md:size-6">
            {/* Empty star background */}
            <Star className="md:size-5 size-4 text-zinc-400 absolute" />

            {/* Filled star with clip-path for partial fill */}
            <div
              className="absolute overflow-hidden"
              style={{ width: `${fillPercentage * 100}%` }}
            >
              <Star className="md:size-5 size-4 text-primary fill-primary" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
