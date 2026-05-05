import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { ArrowLeft, Lock, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "Afrekenen — Toko 4kids Rental" }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, deposit, total, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.termPrice + i.deliveryPrice, 0);

  if (submitted) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto px-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-toko-sage/20 flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-toko-sage" />
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">Bedankt voor je bestelling! 🎉</h1>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          Je bestelling is ontvangen. We sturen je een bevestigingsmail met alle details en trackinginformatie.
        </p>
        <Link to="/">
          <Button variant="cta" size="lg" className="mt-8">Terug naar Home</Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto px-4">
        <h1 className="text-2xl font-extrabold text-foreground">Geen items in je mandje</h1>
        <Link to="/meubels">
          <Button variant="cta" size="lg" className="mt-6">Bekijk meubels</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/winkelmandje" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Terug naar mandje
        </Link>

        <h1 className="text-3xl font-extrabold text-foreground mb-8">Afrekenen</h1>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-card rounded-2xl border p-6 space-y-4">
              <h2 className="font-bold text-lg text-foreground">Jouw gegevens</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Voornaam</Label>
                  <Input id="firstName" placeholder="Jan" className="rounded-xl mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Achternaam</Label>
                  <Input id="lastName" placeholder="Janssen" className="rounded-xl mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">E-mailadres</Label>
                <Input id="email" type="email" placeholder="jan@voorbeeld.be" className="rounded-xl mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Telefoonnummer</Label>
                <Input id="phone" type="tel" placeholder="+32 412 345 678" className="rounded-xl mt-1" />
              </div>
              <div>
                <Label htmlFor="address">Adres</Label>
                <Input id="address" placeholder="Straatnaam 123, 2000 Antwerpen" className="rounded-xl mt-1" />
              </div>
            </div>

            <div className="bg-card rounded-2xl border p-6 space-y-4">
              <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
                <Lock className="w-5 h-5 text-toko-sage" /> Betaalgegevens
              </h2>
              <div>
                <Label htmlFor="card">Kaartnummer</Label>
                <Input id="card" placeholder="•••• •••• •••• ••••" className="rounded-xl mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Vervaldatum</Label>
                  <Input id="expiry" placeholder="MM/JJ" className="rounded-xl mt-1" />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="•••" className="rounded-xl mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border p-6 sticky top-24">
              <h2 className="font-bold text-lg text-foreground mb-4">Besteloverzicht</h2>
              <div className="space-y-3 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between pb-2 border-b border-border/50">
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-muted-foreground text-xs">
                        {item.termLabel} · {format(item.startDate, "d MMM yyyy", { locale: nl })}
                      </div>
                    </div>
                    <span className="font-semibold">€{item.termPrice + item.deliveryPrice}</span>
                  </div>
                ))}

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotaal</span>
                  <span className="font-semibold">€{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Waarborgsom</span>
                  <span className="font-semibold">€{deposit}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span className="font-bold">Totaal</span>
                  <span className="font-extrabold text-primary text-xl">€{total}</span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-4 bg-toko-amber/10 border border-toko-amber/30 rounded-xl p-3 text-xs text-foreground/70 leading-relaxed">
                <div className="flex items-start gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-toko-amber shrink-0 mt-0.5" />
                  <p>
                    De borg van €{deposit} wordt volledig terugbetaald bij goede staat. Lichte gebruikssporen zijn oké. Bij zware schade wordt 25-50% ingehouden.
                  </p>
                </div>
              </div>

              <Button
                variant="cta"
                size="xl"
                className="w-full mt-6"
                onClick={() => {
                  clearCart();
                  setSubmitted(true);
                  toast.success("Bestelling geplaatst! 🎉");
                }}
              >
                Bestelling plaatsen — €{total}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Veilige betaling
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
