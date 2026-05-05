import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Package, Calendar, CreditCard, Truck, ArrowRight } from "lucide-react";
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
  { icon: Package, title: "1. Kies je meubel", desc: "Blader door ons assortiment van 7 prachtige houten speelmeubels en kies je favoriet." },
  { icon: Calendar, title: "2. Selecteer je huurperiode", desc: "Kies een startdatum en een huurtermijn die bij jou past: van 1 week tot 3 maanden." },
  { icon: CreditCard, title: "3. Betaal & ontvang", desc: "Betaal veilig online (huur + €50 borg). Wij sturen je meubel als flatpack of je haalt het opgebouwd op." },
  { icon: Truck, title: "4. Spelen & retourneren", desc: "Geniet van eindeloos speelplezier! Na afloop stuur je het terug en ontvang je je borg terug." },
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

        {/* Pricing overview */}
        <div className="mt-16 bg-card rounded-3xl border p-6 sm:p-8">
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
            + €50 borg (volledig terugbetaald bij goede staat) · Flatpack verzending gratis · Opgebouwd ophalen +€10
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
