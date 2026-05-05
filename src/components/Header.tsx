import { Link } from "@tanstack/react-router";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-store";
import logo from "@/assets/toko_rental_logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/meubels", label: "Onze Meubels" },
  { to: "/hoe-het-werkt", label: "Hoe het werkt" },
  { to: "/instructies", label: "Bouw-instructies" },
] as const;

export function Header() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="Toko 4kids Rental" className="h-10 sm:h-14 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-full text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all"
                activeProps={{ className: "!text-primary !bg-primary/10" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/winkelmandje"
              className="relative p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-foreground" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-toko-terracotta text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                  {count}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t pt-3 flex flex-col gap-1 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all"
                activeProps={{ className: "!text-primary !bg-primary/10" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
