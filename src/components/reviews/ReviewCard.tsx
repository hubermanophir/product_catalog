import { Review } from "@prisma/client";
import StarRating from "../common/StarRating";

type Props = {
  review: Review;
};

export default function ReviewCard(props: Props) {
  const { review } = props;
  return (
    <li className="bg-gray-50 p-4 rounded shadow">
      <p className="text-sm text-gray-500">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
      <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
      <p className="mt-2 text-gray-700">{review.comment}</p>
      <div className="flex items-center">
        <StarRating score={review.rating} />
      </div>
    </li>
  );
}
