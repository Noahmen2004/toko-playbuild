export interface Product {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
}

export const products: Product[] = [
  {
    id: "werkbank",
    name: "De Werkbank",
    description: "Een stevige houten werkbank waar kleine klussers hun creativiteit kwijt kunnen. Compleet met gereedschapsophanging en werkblad.",
    emoji: "🔨",
    color: "from-toko-terracotta/20 to-toko-amber/20",
  },
  {
    id: "keuken",
    name: "De Keuken",
    description: "Een prachtige speelkeuken met oventje, spoelbak en draaiknoppen. Laat je kind de lekkerste fantasiegerechten bereiden!",
    emoji: "👨‍🍳",
    color: "from-toko-peach/20 to-toko-cream",
  },
  {
    id: "ijskar",
    name: "De IJskar",
    description: "Een charmante houten ijskar op wielen. Perfect voor zomerse rollenspellen en kinderfeestjes!",
    emoji: "🍦",
    color: "from-toko-sky/20 to-toko-cream",
  },
  {
    id: "winkel",
    name: "De Winkel",
    description: "Een complete houten winkel met toonbank en schappen. Ideaal voor het spelen van winkeltje met vriendjes.",
    emoji: "🏪",
    color: "from-toko-sage/20 to-toko-cream",
  },
  {
    id: "marktkraampje",
    name: "Het Marktkraampje",
    description: "Een gezellig marktkraampje met luifel. Verkoop fruit, groenten of bloemen — de fantasie kent geen grenzen!",
    emoji: "🎪",
    color: "from-toko-amber/20 to-toko-peach/20",
  },
  {
    id: "frigo",
    name: "De Frigo",
    description: "Een houten koelkast met deurtjes die echt open en dicht gaan. Het perfecte aanvulstuk voor elke speelkeuken.",
    emoji: "🧊",
    color: "from-toko-sky/20 to-toko-sage/20",
  },
  {
    id: "bbq",
    name: "De BBQ",
    description: "Een realistische houten barbecue met roosters en accessoires. Tijd voor een gezellige speeltuin-BBQ!",
    emoji: "🔥",
    color: "from-toko-terracotta/20 to-toko-amber/10",
  },
];

export const rentalTerms = [
  { label: "1 Week", sublabel: "Ideaal voor feestjes/proberen", price: 15 },
  { label: "1 Maand", sublabel: "Populairste keuze", price: 30, popular: true },
  { label: "2 Maanden", sublabel: "", price: 40 },
  { label: "3 Maanden", sublabel: "Voor de echte fans", price: 50 },
];
