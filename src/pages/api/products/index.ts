import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Product } from "@prisma/client";

export type GetProductsRes = {
  products: ({
    _count: {
      reviews: number;
    };
  } & {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
    averageScore: number;
  })[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.max(1, parseInt(req.query.limit as string) || 8);
      const skip = (page - 1) * limit;
      const products = await prisma.product.findMany({
        skip,
        take: limit >= 20 || limit < 0 ? 20 : limit,
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
      const { name, price, category, description, imageUrl }: Partial<Product> =
        req.body;
      const missingFields = [];
      if (!name) {
        missingFields.push("name");
      }
      if (!price) {
        missingFields.push("price");
      }
      if (!category) {
        missingFields.push("category");
      }
      if (!description) {
        missingFields.push("description");
      }
      if (!imageUrl) {
        missingFields.push("imageUrl");
      }

      if (missingFields.length > 0) {
        return res.status(400).json({
          data: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

      await prisma.product.create({
        data: {
          category: category as string,
          description: description as string,
          imageUrl: imageUrl as string,
          name: name as string,
          price: price as number,
        },
      });
      return res.status(200).json({ data: "Created Item" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to fetch products" + error });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
