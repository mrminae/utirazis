"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Product = {
  id?: string;
  databaseId?: number;
  name?: string;
  slug?: string;
  price?: string | null;
  image?: { sourceUrl?: string | null; altText?: string | null } | null;
};

export default function Storefront({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const categories = ["All", "PC Components", "Storage", "Memory", "Accessories"];

  const filtered = useMemo(() => products.filter((product) => {
    const name = (product.name ?? "").toLowerCase();
    const q = query.trim().toLowerCase();
    const matchQuery = !q || name.includes(q);
    const matchCategory = category === "All" ||
      (category === "Storage" && /ssd|hdd|drive|storage/.test(name)) ||
      (category === "Memory" && /ram|memory|ddr/.test(name)) ||
      (category === "Accessories" && /cable|mouse|keyboard|adapter|headset/.test(name)) ||
      (category === "PC Components" && !/ssd|hdd|drive|storage|ram|memory|ddr|cable|mouse|keyboard|adapter|headset/.test(name));
    return matchQuery && matchCategory;
  }), [products, query, category]);

  return (
    <main className="ut-store" dir="inherit">
      <header className="ut-header">
        <Link className="ut-brand" href="/"><span className="ut-logo">U</span><span>utirazis<span className="ut-accent">.</span><small>COMPUTING, REFINED</small></span></Link>
        <label className="ut-search"><span aria-hidden="true">⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search components, brands, and more…" aria-label="Search products" /></label>
        <button className="ut-cart" onClick={() => document.getElementById("ut-products")?.scrollIntoView({ behavior: "smooth" })}>Cart <b>{cartCount}</b></button>
      </header>

      <section className="ut-hero">
        <div className="ut-hero-copy"><span className="ut-eyebrow"><i /> BUILT FOR WHAT’S NEXT</span><h1>Power your<br /><em>next big idea.</em></h1><p>Thoughtfully selected PC components and computing essentials. The right parts, without the noise.</p><a className="ut-cta" href="#ut-products">Explore the collection <span>↗</span></a><div className="ut-proof"><span>01 / QUALITY FIRST</span><span>02 / SMART SELECTION</span><span>03 / REAL VALUE</span></div></div>
        <div className="ut-hero-visual" aria-hidden="true"><div className="ut-orbit ut-orbit-a" /><div className="ut-orbit ut-orbit-b" /><div className="ut-chip"><div><b>U</b><small>PERFORMANCE<br />ENGINEERED</small></div></div><span className="ut-visual-label">PRECISION COMPONENTS</span><span className="ut-visual-caption">EST. FOR BUILDERS</span></div>
      </section>

      <section className="ut-benefits"><div><span>↗</span><p><b>Curated selection</b><small>Components worth choosing</small></p></div><div><span>◇</span><p><b>Quality focused</b><small>Built around your setup</small></p></div><div><span>◎</span><p><b>Clear product details</b><small>Make informed decisions</small></p></div></section>

      <section className="ut-products" id="ut-products"><div className="ut-section-head"><div><span className="ut-eyebrow">THE COLLECTION</span><h2>Find your next <em>upgrade.</em></h2></div><span className="ut-count">{filtered.length.toString().padStart(2, "0")} PRODUCTS</span></div>
        <nav className="ut-categories" aria-label="Product categories">{categories.map((item) => <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)}>{item}</button>)}</nav>
        {filtered.length ? <div className="ut-grid">{filtered.map((product, index) => <article className="ut-card" key={product.id ?? product.databaseId ?? product.slug ?? index}><a className="ut-product-image" href={product.slug ? `/product/${product.slug}` : "#ut-products"}>{product.image?.sourceUrl ? <img src={product.image.sourceUrl} alt={product.image.altText || product.name || "Computer component"} loading="lazy" /> : <span className="ut-placeholder">U<small>UTIRAZIS</small></span>}<span className="ut-index">{String(index + 1).padStart(2, "0")}</span></a><div className="ut-card-info"><span className="ut-product-label">COMPUTING ESSENTIALS</span><h3>{product.name || "Untitled product"}</h3><div className="ut-card-bottom"><strong>{product.price || "Price on request"}</strong><button onClick={() => setCartCount((n) => n + 1)} aria-label={`Add ${product.name ?? "product"} to cart`}>+</button></div></div></article>)}</div> : <div className="ut-empty"><h3>No products found</h3><p>Try another search or choose a different category.</p><button onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button></div>}
      </section>
      <footer className="ut-footer"><Link className="ut-brand" href="/"><span className="ut-logo">U</span><span>utirazis<span className="ut-accent">.</span></span></Link><span>Good components. Better builds.</span><span>© {new Date().getFullYear()} Utirazis</span></footer>
    </main>
  );
}
