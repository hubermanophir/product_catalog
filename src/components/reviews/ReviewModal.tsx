import React, { useState } from "react";
import StarRating from "../common/StarRating";
import Button from "../common/Button";

type Props = {
  productId: string;
};

export default function ReviewModal({ productId }: Props) {
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
              <Button onClick={() => setIsOpen(false)} children={"Cancel"} />
              <Button
                onClick={handleSubmit}
                disabled={loading}
                children={loading ? "Submitting..." : "Submit"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
