import bbqImg from "@/assets/products/bbq.png";
import frigoImg from "@/assets/products/frigo.png";
import winkelImg from "@/assets/products/winkel.png";
import ijskarImg from "@/assets/products/ijskar.png";
import keukenImg from "@/assets/products/keuken.png";
import werkbankImg from "@/assets/products/werkbank.png";

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
  dimensions: string;
  material: string;
  weight: string;
  ageRange: string;
  buildTime: string;
  availableColors: string[];
}

export const availableColorOptions = [
  { value: "groen", label: "Pastel Groen", hex: "#A8D5BA" },
  { value: "roze", label: "Pastel Roze", hex: "#F4C2C2" },
  { value: "blauw", label: "Pastel Blauw", hex: "#A7C7E7" },
];

export const products: Product[] = [
  {
    id: "werkbank",
    name: "De Werkbank",
    description: "Een stevige houten werkbank waar kleine klussers hun creativiteit kwijt kunnen. Compleet met gereedschapsophanging, draaibare tandwielen en werkblad met bankschroef.",
    image: werkbankImg,
    color: "from-toko-sage/20 to-toko-cream",
    dimensions: "65cm (L) × 45cm (B) × 80cm (H)",
    material: "MDF en multiplex",
    weight: "12 kg",
    ageRange: "3+ jaar",
    buildTime: "~30 minuten",
    availableColors: ["groen", "roze", "blauw"],
  },
  {
    id: "keuken",
    name: "De Keuken",
    description: "Een prachtige speelkeuken met oventje, spoelbak, draaiknoppen en een rieten deurtje. Laat je kind de lekkerste fantasiegerechten bereiden!",
    image: keukenImg,
    color: "from-toko-peach/20 to-toko-cream",
    dimensions: "75cm (L) × 48cm (B) × 109cm (H)",
    material: "MDF",
    weight: "13,15 kg",
    ageRange: "3+ jaar",
    buildTime: "~30 minuten",
    availableColors: ["groen", "roze", "blauw"],
  },
  {
    id: "ijskar",
    name: "De IJskar",
    description: "Een charmante houten ijskar op wielen met schappjes en een rieten paneel. Perfect voor zomerse rollenspellen en kinderfeestjes!",
    image: ijskarImg,
    color: "from-toko-sky/20 to-toko-cream",
    dimensions: "118cm (H) × 93cm (B) × 40cm (D)",
    material: "MDF",
    weight: "13,15 kg",
    ageRange: "3+ jaar",
    buildTime: "~30 minuten",
    availableColors: ["groen", "roze", "blauw"],
  },
  {
    id: "winkel",
    name: "De Winkel",
    description: "Een complete houten winkel met boogvormig frame, schappen en opbergruimte. Ideaal voor het spelen van winkeltje met vriendjes.",
    image: winkelImg,
    color: "from-toko-sky/20 to-toko-cream",
    dimensions: "75cm (L) × 48cm (B) × 123cm (H)",
    material: "MDF",
    weight: "13,15 kg",
    ageRange: "3+ jaar",
    buildTime: "~30 minuten",
    availableColors: ["groen", "roze", "blauw"],
  },
  {
    id: "frigo",
    name: "De Frigo",
    description: "Een houten koelkast met deurtjes die echt open en dicht gaan, inclusief een kijkvenster en rieten paneel. Het perfecte aanvulstuk voor elke speelkeuken.",
    image: frigoImg,
    color: "from-toko-sage/20 to-toko-cream",
    dimensions: "43cm (L) × 42cm (B) × 103cm (H)",
    material: "MDF en multiplex",
    weight: "14 kg",
    ageRange: "3+ jaar",
    buildTime: "~30 minuten",
    availableColors: ["groen", "roze", "blauw"],
  },
  {
    id: "bbq",
    name: "De BBQ",
    description: "Een realistische houten barbecue met roosters, draaiknoppen en opbergruimte. Tijd voor een gezellige speeltuin-BBQ!",
    image: bbqImg,
    color: "from-toko-sage/20 to-toko-amber/20",
    dimensions: "49cm (L) × 43cm (B) × 65cm (H)",
    material: "MDF en multiplex",
    weight: "13 kg",
    ageRange: "3+ jaar",
    buildTime: "~30 minuten",
    availableColors: ["groen", "roze", "blauw"],
  },
];

export const rentalTerms = [
  { label: "1 Week", sublabel: "Ideaal voor feestjes/proberen", price: 15 },
  { label: "1 Maand", sublabel: "Populairste keuze", price: 30, popular: true },
  { label: "2 Maanden", sublabel: "", price: 40 },
  { label: "3 Maanden", sublabel: "Voor de echte fans", price: 50 },
];
