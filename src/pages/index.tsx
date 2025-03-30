import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/products");
  }, [router]);

  return null; // Optionally, you can add a loading indicator here
}
