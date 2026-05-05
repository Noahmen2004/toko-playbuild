import { Link } from "@tanstack/react-router";
import logo from "@/assets/toko_rental_logo.png";

export function Footer() {
  return (
    <footer className="bg-toko-wood text-primary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img src={logo} alt="Toko 4kids Rental" className="h-12 w-auto mb-4 brightness-200" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Premium houten speelgoedmeubels huren voor je kleintje. Duurzaam, educatief en oneindig veel speelplezier!
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Navigatie</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Home</Link>
              <Link to="/meubels" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Onze Meubels</Link>
              <Link to="/hoe-het-werkt" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Hoe het werkt</Link>
              <Link to="/instructies" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Bouw-instructies</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <p>📧 info@toko4kids.be</p>
              <p>📞 +32 123 456 789</p>
              <p>📍 Antwerpen, België</p>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/50">
          © 2026 Toko 4kids Rental. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
}
