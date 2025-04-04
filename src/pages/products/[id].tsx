import ProductPage from "@/components/products/ProductPage";
import ReviewsContainer from "@/components/reviews/ReviewsContainer";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      (async () => {
        const productResponse = await fetch(`/api/products/${id}`);
        const productsData = await productResponse.json();
        setProduct(productsData.product);
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
