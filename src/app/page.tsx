import Link from "next/link";
import { getProducts } from "@/lib/woocommerce";
import Storefront from "@/components/storefront";

export const instant = false;

export default async function HomePage() {
  const result = await getProducts()
    .then((products) => ({ products, error: null as unknown }))
    .catch((error: unknown) => ({ products: null, error }));

  if (result.error) {
    console.error("WooCommerce connection failed:", result.error);
    return (
      <main className="ut-error" dir="inherit">
        <span className="ut-eyebrow">UTIRAZIS / STORE STATUS</span>
        <h1>We couldn’t load the collection.</h1>
        <p>Product data is temporarily unavailable. Please check the store connection and try again.</p>
        <Link href="/">Retry</Link>
      </main>
    );
  }

  return <Storefront products={result.products ?? []} />;
}
