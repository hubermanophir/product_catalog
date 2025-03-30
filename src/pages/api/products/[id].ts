import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const id = req.query.id as string;

  switch (method) {
    case "GET":
      try {
        console.log({ id });
        const product = await prisma.product.findUnique({
          where: { id },
        });
        console.log({ product });

        if (!product) {
          return res.status(404).json({
            success: false,
            error: "Product not found",
          });
        }

        return res.status(200).json({
          product,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).json({
          success: false,
          error: "Internal Server Error",
        });
      }
  }
}
