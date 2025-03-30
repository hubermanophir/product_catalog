import ProductsLayoutContainer from "@/components/products/ProductsLayoutContainer";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetProductsRes } from "../api/products";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Headline } from "@/components/products/Headline";

export default function Page() {
  const router = useRouter();
  const query = router.query;
  const pageQuery = parseInt(query.page as string);
  const currentPage = pageQuery < 1 ? 1 : pageQuery;
  const productsPerPage = 10;

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
    <Box>
      <Headline />
      {products && products.length > 0 ? (
        <ProductsLayoutContainer products={products} />
      ) : (
        <Typography variant="body1" align="center">
          No products available
        </Typography>
      )}
      {products && products.length > 0 && (
        <Stack spacing={2} alignItems="center" mt={4}>
          <Typography variant="body2">Total items: {totalItems}</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Typography variant="body2">
              {currentPage} of {totalPages}
            </Typography>
            <Button
              variant="contained"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
