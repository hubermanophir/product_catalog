import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const products = await prisma.product.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          _count: {
            select: {
              reviews: true,
            },
          },
        },
      });

      const total = await prisma.product.count();

      return res.status(200).json({
        products,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  } else if (req.method === "POST") {
    try {
      await prisma.product.create({
        data: {
          category: "sports",
          description: "sport Item",
          imageUrl: "image",
          name: "hat",
          price: 20,
        },
      });
      console.log("Created Item");
      return res.status(200).json({ data:"Created Item" });
    } catch (error) {
      console.log("error");
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
