import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Portfolio", href: "/portfolio" },
    { name: "Expertise", href: "/expertise" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-lg border-b border-zinc-200 py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="text-4xl font-light text-brand-primary leading-none -mt-1">/</div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight text-brand-dark group-hover:text-brand-primary transition-colors">Sookyung Kim</span>
            <span className="text-sm font-medium text-zinc-500">김수경 PD</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-sm font-semibold transition-colors ${location.pathname === link.href ? "text-brand-primary" : "text-zinc-500 hover:text-brand-primary"}`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/admin" 
            className="p-2 text-zinc-400 hover:text-brand-primary transition-colors"
            title="Admin"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-brand-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-zinc-200 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className="text-lg font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
