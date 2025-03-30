import { Product } from "@prisma/client";
import React from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductsLayoutContainer.module.css";

type Props = {
  products: (Product & { _count: { reviews: number } })[];
};

export default function ProductsLayoutContainer({ products }: Props) {
  return (
    <div className="flex flex-col min-h-[80vh]">
      <div className="flex-grow">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 my-8">
        {products.map((product) => (
        <div className="flex justify-center" key={product.id}>
          <ProductCard product={product} />
        </div>
        ))}
      </div>
      </div>
    </div>
  );
}
