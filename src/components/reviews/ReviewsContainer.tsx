import React, { useState, useEffect, useCallback } from "react";
import ReviewModal from "./ReviewModal";
import ReviewCard from "./ReviewCard";
import { Review } from "@prisma/client";
import Button from "../common/Button";

interface ReviewsContainerProps {
  productId: string;
}

export default function ReviewsContainer({ productId }: ReviewsContainerProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const reviewsPerPage = 3;

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/reviews/${productId}?page=${currentPage}&limit=${reviewsPerPage}`
      );
      const data = await response.json();

      if (currentPage * reviewsPerPage >= data.totalReviews) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setReviews(data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  }, [productId, currentPage]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="p-6 border-t">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      <ReviewModal productId={productId} />
      {reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1 || loading}
          children={"Previous"}
        />
        <span className="text-gray-700">Page {currentPage}</span>
        <Button
          onClick={handleNextPage}
          disabled={!hasMore || loading}
          children={"Next"}
        />
      </div>
    </div>
  );
}
