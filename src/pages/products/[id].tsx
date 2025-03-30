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
      // Fetch product details
      fetch(`/api/products/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log({ data });
          setProduct(data.product);
          setLoading(false);
        });

      // Fetch product reviews
      fetch(`/api/reviews/${id}`)
        .then((response) => response.json())
        .then((data) => setReviews(data.reviews));
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <ProductPage product={product} />

        <ReviewsContainer reviews={reviews} />
      </div>
    </div>
  );
}
