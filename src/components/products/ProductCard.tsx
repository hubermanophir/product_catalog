import { Product } from "@prisma/client";
import React from "react";
import { useRouter } from "next/router";
import StarRating from "../common/StarRating";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

type Props = {
  product: Product & { _count: { reviews: number } };
};

export default function ProductCard({ product }: Props) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

return (
    <Card
        sx={{
            width: 300,
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
        }}
        onClick={handleCardClick}
    >
        <CardMedia
            component="img"
            sx={{
                height: 200,
                objectFit: 'contain',
                padding: 2
            }}
            image={product.imageUrl}
            alt={product.name}
        />
        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Typography gutterBottom variant="h6" component="div">
                {product.name}
            </Typography>
            <Typography variant="body1" color="primary" fontWeight="bold" gutterBottom>
                ${product.price.toFixed(2)}
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                <StarRating score={product.averageScore} />
                <Typography variant="caption" color="text.secondary">
                    ({product._count.reviews} Reviews)
                </Typography>
            </Box>
            <Box mt={2}>
                <Typography
                    variant="body2"
                    bgcolor="background.paper"
                    sx={{
                        display: 'inline-block',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 4,
                        fontSize: '0.75rem',
                        fontWeight: 'medium',
                    }}
                >
                    {product.category}
                </Typography>
            </Box>
        </CardContent>
    </Card>
);
}