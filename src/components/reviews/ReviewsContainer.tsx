import React, { useState, useEffect, useRef, useCallback } from "react";
import ReviewModal from "./ReviewModal";
import ReviewCard from "./ReviewCard";
import { Review } from "@prisma/client";

interface ReviewsContainerProps {
  productId: string;
}

export default function ReviewsContainer({ productId }: ReviewsContainerProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const reviewsPerPage = 2;

  const fetchReviews = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/reviews/${productId}?page=${currentPage}&limit=${reviewsPerPage}`
      );
      const data = await response.json();

      if (data.reviews.length < reviewsPerPage) {
        setHasMore(false);
      }

      setReviews((prevReviews) => {
        const existingIds = new Set(prevReviews.map((review) => review.id));
        const newReviews = data.reviews.filter(
          (review: Review) => !existingIds.has(review.id)
        );
        return [...prevReviews, ...newReviews];
      });

      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  }, [productId, currentPage, hasMore, loading]);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !loading) {
      fetchReviews();
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="p-6 border-t h-96 overflow-y-auto"
    >
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      <ReviewModal productId={productId} onReviewAdded={fetchReviews} />
      {reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
      {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
      {!hasMore && (
        <p className="text-center text-gray-500 mt-4">No more reviews.</p>
      )}
    </div>
  );
}
