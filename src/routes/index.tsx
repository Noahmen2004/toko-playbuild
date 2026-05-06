import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Recycle, Heart, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { products, type Product } from "@/lib/products";
import heroImg from "@/assets/lifestyle/kids-playing.jpg";
import kitchenImg from "@/assets/lifestyle/kitchen-play.jpg";
import shopImg from "@/assets/lifestyle/shop-play.jpg";
import icecartImg from "@/assets/lifestyle/icecart-outdoor.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-toko-cream via-background to-toko-peach/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-toko-amber/20 text-toko-wood px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                🌿 Duurzaam speelplezier
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                Premium houten speelmeubels{" "}
                <span className="text-primary">huren</span> voor je kleintje
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mt-6 leading-relaxed max-w-2xl">
                Waarom kopen als je kunt huren? Ontdek ons assortiment van prachtige houten keukentjes, werkbanken en meer. Duurzaam, betaalbaar en altijd weer nieuw plezier!
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/meubels">
                  <Button variant="cta" size="xl">
                    Ontdek Meubels <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/hoe-het-werkt">
                  <Button variant="outline" size="xl">
                    Hoe het werkt
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <img
                src={heroImg}
                alt="Kinderen spelen met houten speelmeubels van Toko 4kids"
                className="rounded-3xl shadow-2xl w-full object-cover max-h-[480px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Recycle, label: "100% Duurzaam", desc: "Huren in plaats van kopen" },
              { icon: Heart, label: "Samen Bouwen", desc: "Maak het tot een avontuur" },
              { icon: Star, label: "Premium Kwaliteit", desc: "Handgemaakt hout" },
              { icon: Shield, label: "Borg Bescherming", desc: "Transparant & eerlijk" },
            ].map((usp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
                  <usp.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">{usp.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{usp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">Populaire Meubels</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Kies je favoriete speelmeubel en start het avontuur!</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.slice(0, 3).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onSelect={setSelectedProduct} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/meubels">
              <Button variant="outline" size="lg">
                Bekijk alle meubels <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-toko-wood">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-foreground">Klaar om te beginnen?</h2>
          <p className="text-primary-foreground/80 mt-4 text-lg max-w-2xl mx-auto">
            Kies een meubel, selecteer je huurperiode en wij bezorgen het bij jou thuis. Zo simpel is het!
          </p>
          <Link to="/meubels">
            <Button variant="soft" size="xl" className="mt-8">
              Start met huren <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <ProductModal product={selectedProduct!} open={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
