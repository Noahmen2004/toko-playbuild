import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Package, Calendar, CreditCard, Truck, ArrowRight, Store, RotateCcw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/hoe-het-werkt")({
  head: () => ({
    meta: [
      { title: "Hoe het werkt — Toko 4kids Rental" },
      { name: "description", content: "Ontdek hoe eenvoudig het is om houten speelgoedmeubels te huren bij Toko 4kids." },
    ],
  }),
  component: HoeHetWerktPage,
});

const steps = [
  { icon: Package, title: "1. Kies je meubel", desc: "Blader door ons assortiment van 6 prachtige houten speelmeubels en kies je favoriet. Elk meubel is beschikbaar in 3 pastelkleuren." },
  { icon: Calendar, title: "2. Selecteer je huurperiode", desc: "Kies een startdatum en een huurtermijn die bij jou past: van 1 week tot 3 maanden." },
  { icon: CreditCard, title: "3. Kies je leveringsmethode", desc: "Bestel online of huur direct in de winkel. Zie hieronder de opties." },
  { icon: Truck, title: "4. Spelen & retourneren", desc: "Geniet van eindeloos speelplezier! Na afloop retourneer je het meubel en ontvang je je borg terug." },
];

function HoeHetWerktPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Hoe het werkt</h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            In 4 simpele stappen huur je een premium speelmeubel voor je kind.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 items-start"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Delivery & Return Options */}
        <div className="mt-16 bg-card rounded-3xl border p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold text-foreground mb-2 text-center">📦 Levering & Retour</h2>
          <p className="text-muted-foreground text-center mb-8">Je hebt 3 manieren om je meubel te ontvangen en 2 manieren om het terug te brengen.</p>

          <div className="space-y-6">
            {/* Delivery options */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" /> Leveringsopties
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border-2 border-border p-5">
                  <div className="text-2xl mb-2">📦</div>
                  <h4 className="font-bold text-foreground">Online bestellen + Verzending</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Bestel online, wij sturen het meubel als flatpack via de post naar jou thuis. <strong>Verzendkosten zijn voor jouw rekening.</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">De herbruikbare doos moet je bijhouden voor retour.</p>
                  <p className="text-sm font-bold text-primary mt-2">+ €8 verzendkosten</p>
                </div>
                <div className="rounded-2xl border-2 border-border p-5">
                  <div className="text-2xl mb-2">🏪</div>
                  <h4 className="font-bold text-foreground">Online bestellen + Ophalen</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Bestel online en haal je flatpack op in onze Toko-winkel. Bouw het thuis samen op (~30 min).
                  </p>
                  <p className="text-sm font-bold text-primary mt-2">Gratis</p>
                </div>
                <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
                  <div className="text-2xl mb-2">🛋️</div>
                  <h4 className="font-bold text-foreground">In de winkel — Opgebouwd meenemen</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Kom langs in onze winkel, huur direct en neem het volledig opgebouwde meubel mee. Geen bouwwerk nodig!
                  </p>
                  <div className="bg-toko-amber/10 rounded-lg p-2 mt-2 text-xs text-foreground/80">
                    <Info className="w-3 h-3 inline mr-1" /> Zorg voor genoeg ruimte in je auto of bakfiets.
                  </div>
                  <p className="text-sm font-bold text-primary mt-2">Gratis</p>
                </div>
              </div>
            </div>

            {/* Return options */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-primary" /> Retourneren
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border-2 border-border p-5">
                  <div className="text-2xl mb-2">📮</div>
                  <h4 className="font-bold text-foreground">Terugsturen via de post</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Verpak het meubel terug in de originele doos en stuur het naar ons terug. <strong>De verzendkosten zijn voor jouw rekening.</strong>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 italic">Alleen mogelijk als je het als flatpack hebt ontvangen.</p>
                </div>
                <div className="rounded-2xl border-2 border-border p-5">
                  <div className="text-2xl mb-2">🏠</div>
                  <h4 className="font-bold text-foreground">Zelf terugbrengen naar de winkel</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Breng het meubel zelf terug naar onze Toko-winkel. Altijd mogelijk, ongeacht hoe je het ontvangen hebt.
                  </p>
                  <p className="text-sm font-bold text-primary mt-2">Gratis</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                ✅ Bij retour in goede staat ontvang je je volledige borg van <strong>€50</strong> terug.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing overview */}
        <div className="mt-12 bg-card rounded-3xl border p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold text-foreground mb-6 text-center">Huurtarieven</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { term: "1 Week", price: "€15", note: "Feestjes & proberen" },
              { term: "1 Maand", price: "€30", note: "Populairste keuze", popular: true },
              { term: "2 Maanden", price: "€40", note: "Meer speeltijd" },
              { term: "3 Maanden", price: "€50", note: "Voor de echte fans" },
            ].map((t, i) => (
              <div key={i} className={`relative rounded-2xl p-5 text-center border-2 transition-all ${t.popular ? "border-primary bg-primary/5 shadow-md" : "border-border"}`}>
                {t.popular && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-toko-amber text-accent-foreground text-xs font-bold px-3 py-0.5 rounded-full whitespace-nowrap">⭐ Populair</span>}
                <div className="text-3xl font-extrabold text-primary">{t.price}</div>
                <div className="font-bold text-foreground mt-1">{t.term}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.note}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center mt-6">
            + €50 borg (volledig terugbetaald bij goede staat) · Gemiddelde bouwtijd ~30 minuten
          </p>
        </div>

        <div className="text-center mt-12">
          <Link to="/meubels">
            <Button variant="cta" size="xl">
              Bekijk de meubels <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
