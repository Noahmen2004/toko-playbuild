import { createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Trash2, ShoppingCart, ArrowRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/winkelmandje")({
  head: () => ({
    meta: [
      { title: "Winkelmandje — Toko 4kids Rental" },
    ],
  }),
  component: WinkelmandPage,
});

function WinkelmandPage() {
  const { items, removeFromCart, deposit, total } = useCart();

  const subtotal = items.reduce((s, i) => s + i.termPrice + i.deliveryPrice, 0);

  if (items.length === 0) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto px-4">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-2xl font-extrabold text-foreground">Je mandje is leeg</h1>
        <p className="text-muted-foreground mt-2">Voeg een meubel toe om te beginnen met huren!</p>
        <Link to="/meubels">
          <Button variant="cta" size="lg" className="mt-6">
            Bekijk meubels <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-foreground mb-8 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8" /> Winkelmandje
        </h1>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="bg-card rounded-2xl border p-5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground text-lg">{item.name}</h3>
                <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                  <p>📅 Start: {format(item.startDate, "PPP", { locale: nl })}</p>
                  <p>⏱️ Huurperiode: {item.termLabel}</p>
                  <p>🚚 {item.deliveryMethod === "flatpack" ? "Flatpack (gratis verzending)" : "Opgebouwd (+€10)"}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xl font-extrabold text-primary">€{item.termPrice + item.deliveryPrice}</div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 p-2 rounded-full hover:bg-destructive/10 text-destructive transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="bg-card rounded-2xl border p-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Huurprijs + verzending</span>
              <span className="font-semibold">€{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Waarborgsom (borg)</span>
              <span className="font-semibold">€{deposit}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg">
              <span className="font-bold text-foreground">Totaal</span>
              <span className="font-extrabold text-primary text-xl">€{total}</span>
            </div>
          </div>

          {/* Damage disclaimer */}
          <div className="mt-6 bg-toko-amber/10 border border-toko-amber/30 rounded-2xl p-4 text-sm text-foreground/80 leading-relaxed">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-toko-amber shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground mb-1">Schadebeleid & Borg</p>
                <p>
                  We verwachten dat er met het speelgoed gespeeld wordt! Lichte gebruikssporen (zoals kleine krasjes of wat verf die afvalt) zijn volledig oké en inbegrepen in de prijs. Echter, als er een essentieel onderdeel afbreekt of zwaar beschadigd raakt, zullen wij de kostprijs van dat specifieke onderdeel inhouden van de borg (dit is doorgaans zo'n 25% tot 50% van de borgsom, afhankelijk van het onderdeel).
                </p>
              </div>
            </div>
          </div>

          <Link to="/checkout">
            <Button variant="cta" size="xl" className="w-full mt-6">
              Afrekenen <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
