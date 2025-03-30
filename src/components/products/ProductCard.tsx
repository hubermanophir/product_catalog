import { Product } from "@prisma/client";
import React from "react";
import { useRouter } from "next/router";
import StarRating from "../common/StarRating";

type Props = {
  product: Product & { _count: { reviews: number } };
};

export default function ProductCard({ product }: Props) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div
      className="w-80 h-auto rounded overflow-hidden shadow-lg p-4 bg-white flex flex-col items-center cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        className="w-64 h-64 object-contain mb-4"
        src={product.imageUrl}
        alt={product.name}
      />
      <div className="text-center flex flex-col items-center flex-1 justify-between">
        <div>
          <div className="font-bold text-xl mb-2">{product.name}</div>
          <div className="text-lg font-bold text-green-600 mb-2">
            ${product.price.toFixed(2)}
          </div>
          <div className="flex justify-center items-center space-x-2 mb-4">
            <StarRating product={product} />
            <span className="text-sm text-gray-700 whitespace-nowrap">
              ({product._count.reviews} Reviews)
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-auto">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
}
