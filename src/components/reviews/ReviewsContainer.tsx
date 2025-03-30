import React from "react";
import Review from "./Review";

interface Review {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
}

interface ReviewsContainerProps {
  reviews: Review[];
}

export default function ReviewsContainer({ reviews }: ReviewsContainerProps) {
  return (
    <div className="p-6 border-t">
      <p className="text-sm text-gray-500">
        Reviews: <span className="font-semibold">{reviews.length}</span>
      </p>
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      {reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <Review review={review} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
}
