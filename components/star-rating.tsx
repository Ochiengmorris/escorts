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
          <div key={index} className="relative w-6 h-6">
            {/* Empty star background */}
            <Star className="w-5 h-5 text-zinc-400 absolute" />

            {/* Filled star with clip-path for partial fill */}
            <div
              className="absolute overflow-hidden"
              style={{ width: `${fillPercentage * 100}%` }}
            >
              <Star className="w-5 h-5 text-primary fill-primary" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
