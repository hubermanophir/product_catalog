import ProductsLayoutContainer from "@/components/products/ProductsLayoutContainer";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetProductsRes } from "../api/products";
import Button from "@/components/common/Button";
import { Headline } from "@/components/products/Headline";

export default function Page() {
  const router = useRouter();
  const query = router.query;
  const pageQuery = parseInt(query.page as string);
  const currentPage = pageQuery < 1 ? 1 : pageQuery;
  const productsPerPage = 8;

  const [products, setProducts] = useState<
    (Product & { _count: { reviews: number } })[] | null
  >(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      router.replace(`?page=${currentPage + 1}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      router.replace(`?page=${currentPage - 1}`);
    }
  };

  useEffect(() => {
    if (router.pathname === "/products" && !query.page) {
      router.replace("?page=1");
    }
  }, [router, query.page]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `/api/products?page=${currentPage}&limit=${productsPerPage}`
      );
      const res: GetProductsRes = await response.json();
      setProducts(res.products);
      setTotalItems(res.pagination.total);
      setTotalPages(
        res.pagination.total
          ? Math.ceil(res.pagination.total / productsPerPage)
          : 1
      );
    })();
  }, [currentPage]);

  return (
    <div>
      <Headline />
      {products && products.length > 0 ? (
        <ProductsLayoutContainer products={products} />
      ) : (
        <p>No products available</p>
      )}
      {products && products.length > 0 && (
        <div className="flex flex-col items-center mt-8 space-y-4">
          <p>Total items: {totalItems}</p>
          <div className="flex justify-center items-center space-x-4">
            <Button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <span>
              {currentPage} of {totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
