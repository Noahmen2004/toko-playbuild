import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { type Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index: number;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, index, onSelect }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group"
    >
      <div className="bg-card rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/50">
        <div className={`bg-gradient-to-br ${product.color} p-8 sm:p-10 flex items-center justify-center`}>
          <span className="text-7xl sm:text-8xl group-hover:scale-110 transition-transform duration-300">
            {product.emoji}
          </span>
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="text-xl font-extrabold text-foreground mb-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">Vanaf €15/week</span>
            <Button variant="cta" size="sm" onClick={() => onSelect(product)}>
              Bekijk Meubel
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
