import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productId } = req.query;

  if (req.method === "GET") {
    if (!productId || typeof productId !== "string") {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    try {
      const reviews = await prisma.review.findMany({
        where: { productId },
        orderBy: { createdAt: "desc" },
      });

      return res.status(200).json({ reviews });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
