import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { productId, userId, rating, comment, title } = req.body;
    console.log({ body: req.body });
    if (!productId || typeof rating !== "number" || !comment || !title) {
      return res.status(400).json({ error: "Missing or invalid fields" });
    }

    try {
      const newReview = await prisma.review.create({
        data: {
          productId,
          rating,
          comment,
          title,
        },
      });

      return res
        .status(201)
        .json({ message: "Review created successfully", review: newReview });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create review" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
