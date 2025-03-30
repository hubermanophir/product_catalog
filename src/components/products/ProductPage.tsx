import { Product } from "@prisma/client";
import React from "react";

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Product Image */}
      <div className="md:w-1/2">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="md:w-1/2 p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-lg font-bold text-green-600 mb-4">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Category: <span className="font-semibold">{product.category}</span>
        </p>
      </div>
    </div>
  );
}
