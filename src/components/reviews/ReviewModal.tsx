import React, { useState } from "react";
import StarRating from "../common/StarRating";
import Button from "../common/Button";

type Props = {
  productId: string;
  onReviewAdded: () => void;
};

export default function ReviewModal({ productId, onReviewAdded }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !comment || rating === 0) {
      alert("Please provide a title, comment, and rating.");
      return;
    }

    setLoading(true);
    try {
      console.log({ rating, comment, title, productId });
      const response = await fetch(`/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          title,
          comment,
          rating,
        }),
      });

      if (response.ok) {
        setIsOpen(false);
        setTitle("");
        setComment("");
        setRating(0);
        onReviewAdded(); // Refresh reviews
      } else {
        alert("Failed to add review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} children={"Add Review"} />
      {isOpen && (
        <div className="fixed inset-0 backdrop-brightness-30 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add a Review</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Rating:
              </label>
              <StarRating
                score={rating}
                className="cursor-pointer"
                style={{ fontSize: "1.5rem" }}
                onChange={(newRating: number) => setRating(newRating)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Title:
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter a title for your review"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Comment:
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
                rows={4}
                placeholder="Write your review here..."
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
