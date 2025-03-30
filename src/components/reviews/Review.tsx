type Props = {
  review: { id: string; createdAt: string; content: string; rating: number };
};

export default function Review(props: Props) {
  const { review } = props;
  return (
    <li key={review.id} className="bg-gray-50 p-4 rounded shadow">
      <p className="text-sm text-gray-500">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-800">{review.content}</p>
      <p className="text-yellow-500 font-bold">Rating: {review.rating} / 5</p>
    </li>
  );
}
