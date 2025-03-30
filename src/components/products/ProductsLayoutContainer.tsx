import React from "react";
import { Box, Container } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "@prisma/client";

type Props = {
  products: (Product & { _count: { reviews: number } })[];
};

export default function ProductsLayoutContainer({ products }: Props) {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
          },
          gap: 3,
          justifyItems: "center",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Container>
  );
}
