import { Product } from "@prisma/client";
import React from "react";

type Props = {
  product: Product;
  className?: string;
  style?: React.CSSProperties;
};

export default function StarRating({ product, className, style }: Props) {
  return (
    <div className={`flex items-center ${className || ""}`} style={style}>
      {Array.from({ length: 5 }, (_, i) => {
        const score = product.averageScore;
        const isFullStar = i < Math.floor(score);
        const isHalfStar = !isFullStar && i < Math.floor(score + 0.5);

        return (
          <span key={i} className="relative inline-block w-5 h-5">
            <svg
              className="w-5 h-5 text-gray-300 absolute top-0 left-0 z-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>

            {(isFullStar || isHalfStar) && (
              <svg
                className="w-5 h-5 text-yellow-500 absolute top-0 left-0 z-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                style={{
                  clipPath: isHalfStar ? "inset(0 50% 0 0)" : "none",
                }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
              </svg>
            )}
          </span>
        );
      })}
    </div>
  );
}
