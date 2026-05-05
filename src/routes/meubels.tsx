import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { products, type Product } from "@/lib/products";

export const Route = createFileRoute("/meubels")({
  head: () => ({
    meta: [
      { title: "Onze Meubels — Toko 4kids Rental" },
      { name: "description", content: "Ontdek ons volledige assortiment premium houten speelgoedmeubels om te huren." },
    ],
  }),
  component: MeubelsPage,
});

function MeubelsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Onze Meubels</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Elk meubel is handgemaakt van duurzaam hout en ontworpen om de verbeelding van je kind te prikkelen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onSelect={setSelectedProduct} />
          ))}
        </div>
      </div>
      <ProductModal product={selectedProduct!} open={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
