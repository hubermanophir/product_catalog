import ProductPage from "@/components/products/ProductPage";
import ReviewsContainer from "@/components/reviews/ReviewsContainer";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Review = {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
};

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      (async () => {
        const productResponse = await fetch(`/api/products/${id}`);
        const productsData = await productResponse.json();
        setProduct(productsData.product);
        const reviewsResponse = await fetch(`/api/reviews/${id}`);

        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData.reviews);

        setLoading(false);
      })();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <ProductPage product={product} />

        <ReviewsContainer productId={product.id} />
      </div>
    </div>
  );
}
