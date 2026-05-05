import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, Package, Truck, Check } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarWidget } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { type Product, rentalTerms } from "@/lib/products";
import { addToCart } from "@/lib/cart-store";
import { toast } from "sonner";

interface ProductModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export function ProductModal({ product, open, onClose }: ProductModalProps) {
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<"flatpack" | "assembled" | null>(null);

  const reset = () => {
    setStep(1);
    setStartDate(undefined);
    setSelectedTerm(null);
    setDeliveryMethod(null);
  };

  const handleAddToCart = () => {
    if (!startDate || selectedTerm === null || !deliveryMethod) return;
    const term = rentalTerms[selectedTerm];
    addToCart({
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      startDate,
      termLabel: term.label,
      termPrice: term.price,
      deliveryMethod,
      deliveryPrice: deliveryMethod === "assembled" ? 10 : 0,
    });
    toast.success(`${product.name} toegevoegd aan je mandje! 🎉`);
    reset();
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-card rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`bg-gradient-to-br ${product.color} p-6 sm:p-8 rounded-t-3xl relative`}>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-card/80 hover:bg-card transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="text-6xl sm:text-7xl mb-3">{product.emoji}</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">{product.name}</h2>
            <p className="text-foreground/70 mt-2 leading-relaxed">{product.description}</p>
          </div>

          <div className="p-6 sm:p-8">
            {/* Info box */}
            <div className="bg-toko-cream rounded-2xl p-4 mb-6 text-sm text-foreground/80 leading-relaxed">
              <p className="font-semibold text-foreground mb-1">📦 Goed om te weten</p>
              Al onze meubels worden standaard geleverd in een handige, herbruikbare doos. Om de magie met je kind te delen, vragen we de ouders om het meubelstuk thuis nog deels zelf in elkaar te steken. Samen bouwen is tenslotte de helft van de pret!
            </div>

            {/* Steps */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                    step >= s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  )}>
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s < 3 && <div className={cn("w-8 sm:w-16 h-1 rounded-full transition-all", step > s ? "bg-primary" : "bg-secondary")} />}
                </div>
              ))}
            </div>

            {/* Step 1: Date */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="font-bold text-lg mb-3">📅 Kies je startdatum</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="lg" className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                      <Calendar className="mr-2 h-5 w-5" />
                      {startDate ? format(startDate, "PPP", { locale: nl }) : "Selecteer een datum"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarWidget
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <Button
                  variant="cta"
                  size="lg"
                  className="w-full mt-4"
                  disabled={!startDate}
                  onClick={() => setStep(2)}
                >
                  Volgende →
                </Button>
              </motion.div>
            )}

            {/* Step 2: Term */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="font-bold text-lg mb-3">⏱️ Kies je huurtermijn</h3>
                <div className="grid gap-3">
                  {rentalTerms.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedTerm(i)}
                      className={cn(
                        "relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left",
                        selectedTerm === i
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/40 hover:bg-secondary/50"
                      )}
                    >
                      {term.popular && (
                        <span className="absolute -top-2.5 left-4 bg-toko-amber text-accent-foreground text-xs font-bold px-3 py-0.5 rounded-full">
                          ⭐ Populairste keuze
                        </span>
                      )}
                      <div>
                        <div className="font-bold text-foreground">{term.label}</div>
                        {term.sublabel && <div className="text-sm text-muted-foreground">{term.sublabel}</div>}
                      </div>
                      <div className="text-xl font-extrabold text-primary">€{term.price}</div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" size="lg" onClick={() => setStep(1)} className="flex-1">← Terug</Button>
                  <Button variant="cta" size="lg" className="flex-1" disabled={selectedTerm === null} onClick={() => setStep(3)}>Volgende →</Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Delivery */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="font-bold text-lg mb-3">🚚 Kies je leveringsmethode</h3>
                <div className="grid gap-3">
                  <button
                    onClick={() => setDeliveryMethod("flatpack")}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                      deliveryMethod === "flatpack"
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/40"
                    )}
                  >
                    <Package className="w-8 h-8 text-toko-amber shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="font-bold">Flatpack in herbruikbare doos</div>
                      <div className="text-sm text-muted-foreground">Standaard & goedkoopst — Verzending via post. Je zet het samen met je kind in elkaar.</div>
                      <div className="font-bold text-primary mt-1">Gratis verzending</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setDeliveryMethod("assembled")}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                      deliveryMethod === "assembled"
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/40"
                    )}
                  >
                    <Truck className="w-8 h-8 text-toko-sage shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="font-bold">Volledig geassembleerd (Premium)</div>
                      <div className="text-sm text-muted-foreground">Lokaal op te halen in onze Toko-winkel. Klaar voor gebruik!</div>
                      <div className="font-bold text-primary mt-1">+ €10 servicekosten</div>
                    </div>
                  </button>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" size="lg" onClick={() => setStep(2)} className="flex-1">← Terug</Button>
                  <Button variant="cta" size="lg" className="flex-1" disabled={!deliveryMethod} onClick={handleAddToCart}>
                    🛒 Huur Nu
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
