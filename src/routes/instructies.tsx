import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Play, FileDown, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/instructies")({
  head: () => ({
    meta: [
      { title: "Bouw-instructies — Toko 4kids Rental" },
      { name: "description", content: "Bekijk onze stap-voor-stap instructievideo's en download handleidingen voor het opbouwen van je speelmeubel." },
    ],
  }),
  component: InstructiesPage,
});

function InstructiesPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🔧</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Bouw-instructies</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
            Lukt het even niet? Bekijk onze stap-voor-stap video's en bouw samen met je kleine klusser het meubelstuk in no-time op!
          </p>
        </div>

        {/* Reassurance */}
        <div className="bg-toko-cream rounded-3xl p-6 sm:p-8 mb-12 flex items-start gap-4">
          <Wrench className="w-8 h-8 text-primary shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-foreground">Maak je geen zorgen!</h3>
            <p className="text-foreground/80 leading-relaxed mt-1">
              Onze meubels zijn ontworpen om eenvoudig in elkaar te zetten — geen speciaal gereedschap nodig. 
              De gemiddelde bouwtijd is 15-20 minuten. En het leukste? Je kind kan meehelpen! 
              Samen bouwen is tenslotte de helft van de pret. 🎉
            </p>
          </div>
        </div>

        {/* Instructions per product */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl border overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${product.color} p-6 flex items-center gap-4`}>
                <span className="text-4xl">{product.emoji}</span>
                <h3 className="text-lg font-extrabold text-foreground">{product.name}</h3>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => toast.info("De instructievideo wordt binnenkort toegevoegd!")}
                >
                  <Play className="w-4 h-4 text-primary" />
                  Bekijk de instructievideo
                </Button>
                <Button
                  variant="soft"
                  className="justify-start"
                  onClick={() => toast.info("De PDF-handleiding wordt binnenkort beschikbaar!")}
                >
                  <FileDown className="w-4 h-4 text-toko-wood" />
                  Download PDF handleiding
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
