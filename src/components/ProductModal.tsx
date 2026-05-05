import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, Package, Store, Truck, Check, Info, Ruler, Weight, Clock } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarWidget } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { type Product, rentalTerms, availableColorOptions } from "@/lib/products";
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
  const [selectedColor, setSelectedColor] = useState<string>("groen");
  const [deliveryMethod, setDeliveryMethod] = useState<"flatpack-post" | "assembled-pickup" | "flatpack-store" | null>(null);

  const reset = () => {
    setStep(1);
    setStartDate(undefined);
    setSelectedTerm(null);
    setDeliveryMethod(null);
    setSelectedColor("groen");
  };

  const handleAddToCart = () => {
    if (!startDate || selectedTerm === null || !deliveryMethod) return;
    const term = rentalTerms[selectedTerm];
    const deliveryPrice = deliveryMethod === "flatpack-post" ? 8 : 0;
    addToCart({
      id: `${product.id}-${Date.now()}`,
      name: `${product.name} (${availableColorOptions.find(c => c.value === selectedColor)?.label})`,
      startDate,
      termLabel: term.label,
      termPrice: term.price,
      deliveryMethod: deliveryMethod === "assembled-pickup" ? "assembled" : "flatpack",
      deliveryPrice,
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
            <img src={product.image} alt={product.name} className="h-32 sm:h-40 object-contain mb-3" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">{product.name}</h2>
            <p className="text-foreground/70 mt-2 leading-relaxed">{product.description}</p>
          </div>

          <div className="p-6 sm:p-8">
            {/* Product specs */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-secondary rounded-xl p-3 text-center">
                <Ruler className="w-4 h-4 mx-auto text-primary mb-1" />
                <div className="text-xs text-muted-foreground">Afmetingen</div>
                <div className="text-xs font-bold text-foreground">{product.dimensions}</div>
              </div>
              <div className="bg-secondary rounded-xl p-3 text-center">
                <Weight className="w-4 h-4 mx-auto text-primary mb-1" />
                <div className="text-xs text-muted-foreground">Gewicht</div>
                <div className="text-xs font-bold text-foreground">{product.weight}</div>
              </div>
              <div className="bg-secondary rounded-xl p-3 text-center">
                <Clock className="w-4 h-4 mx-auto text-primary mb-1" />
                <div className="text-xs text-muted-foreground">Bouwtijd</div>
                <div className="text-xs font-bold text-foreground">{product.buildTime}</div>
              </div>
            </div>

            {/* Color selection */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-foreground mb-2">🎨 Kies je kleur</h4>
              <div className="flex gap-3">
                {availableColorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all text-sm font-medium",
                      selectedColor === color.value
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/40"
                    )}
                  >
                    <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: color.hex }} />
                    {color.label}
                  </button>
                ))}
              </div>
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
                <Button variant="cta" size="lg" className="w-full mt-4" disabled={!startDate} onClick={() => setStep(2)}>
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
                  {/* Option 1: Online bestellen, verzending via post (flatpack) */}
                  <button
                    onClick={() => setDeliveryMethod("flatpack-post")}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                      deliveryMethod === "flatpack-post"
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/40"
                    )}
                  >
                    <Truck className="w-8 h-8 text-toko-amber shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="font-bold">📦 Online bestellen — Verzending via post</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Je ontvangt het meubel als flatpack in een herbruikbare doos. Bouw het samen met je kind op (~30 min). 
                        <strong className="text-foreground"> De doos moet je bijhouden voor retour!</strong>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <strong>Retour:</strong> Stuur het terug via de post (verzendkosten voor eigen rekening) of breng het zelf naar onze winkel.
                      </div>
                      <div className="font-bold text-primary mt-2">+ €8 verzendkosten</div>
                    </div>
                  </button>

                  {/* Option 2: Online bestellen, ophalen in winkel (flatpack) */}
                  <button
                    onClick={() => setDeliveryMethod("flatpack-store")}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                      deliveryMethod === "flatpack-store"
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/40"
                    )}
                  >
                    <Store className="w-8 h-8 text-toko-sage shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="font-bold">🏪 Online bestellen — Ophalen in de winkel</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Bestel online en haal je flatpack-meubel op in onze Toko-winkel. Bouw het thuis samen op (~30 min).
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <strong>Retour:</strong> Breng het zelf terug naar onze winkel.
                      </div>
                      <div className="font-bold text-primary mt-2">Gratis — geen verzendkosten</div>
                    </div>
                  </button>

                  {/* Option 3: In de winkel huren, volledig opgebouwd */}
                  <button
                    onClick={() => setDeliveryMethod("assembled-pickup")}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                      deliveryMethod === "assembled-pickup"
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/40"
                    )}
                  >
                    <Package className="w-8 h-8 text-primary shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="font-bold">🛋️ Volledig opgebouwd — Ophalen in de winkel</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Huur het meubel direct in onze winkel. Het is al volledig in elkaar gezet en klaar voor gebruik. 
                        Neem het meteen mee!
                      </div>
                      <div className="bg-toko-amber/10 rounded-lg p-2 mt-2 text-sm text-foreground/80">
                        <Info className="w-4 h-4 inline mr-1" />
                        Let op: zorg dat je voldoende ruimte hebt in je auto of bakfiets voor een groot speelgoedmeubel.
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <strong>Retour:</strong> Je brengt het zelf terug naar onze winkel.
                      </div>
                      <div className="font-bold text-primary mt-2">Gratis — geen verzendkosten</div>
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
