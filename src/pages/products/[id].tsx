import { ProductQuery } from "@/types/productsTypes";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const query = router.query as ProductQuery;
  return <p>Post: {query.id}</p>;
}
