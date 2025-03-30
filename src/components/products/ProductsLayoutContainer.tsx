import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "@prisma/client";

type Props = {
  products: (Product & { _count: { reviews: number } })[];
};

export default function ProductsLayoutContainer({ products }: Props) {
  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
