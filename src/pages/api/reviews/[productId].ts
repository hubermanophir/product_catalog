import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productId } = req.query;
  if (!productId || typeof productId !== "string") {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.max(1, parseInt(req.query.limit as string) || 5);

  try {
    const totalReviews = await prisma.review.count({
      where: { productId },
    });
    const reviews = await prisma.review.findMany({
      where: { productId },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ reviews, totalReviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
