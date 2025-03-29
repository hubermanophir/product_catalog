import { ProductQuery } from "@/types/productsTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const query = router.query as ProductQuery;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query.id) {
      fetch(`/api/products/${query.id}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [query.id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Data from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
