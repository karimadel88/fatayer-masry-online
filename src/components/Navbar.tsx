
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary font-heading">
              <Link to="/">فطير ام كريم</Link>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="font-medium hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <Link to="/products" className="font-medium hover:text-primary transition-colors">
              قائمة الطعام
            </Link>
            <a href="/#order" className="font-medium hover:text-primary transition-colors">
              اطلب الآن
            </a>
            <a href="/#contact" className="font-medium hover:text-primary transition-colors">
              تواصل معنا
            </a>
          </nav>

          {/* Order Button (Desktop) */}
          <div className="hidden md:block">
            <Link to="/products">
              <Button className="font-bold rounded-lg">
                تصفح القائمة
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="القائمة"
            >
              <Menu />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="px-4 py-2 font-medium hover:text-primary hover:bg-secondary/50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link 
              to="/products" 
              className="px-4 py-2 font-medium hover:text-primary hover:bg-secondary/50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              قائمة الطعام
            </Link>
            <a 
              href="/#order" 
              className="px-4 py-2 font-medium hover:text-primary hover:bg-secondary/50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              اطلب الآن
            </a>
            <a 
              href="/#contact" 
              className="px-4 py-2 font-medium hover:text-primary hover:bg-secondary/50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              تواصل معنا
            </a>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>
              <Button className="mt-2 font-bold">
                تصفح القائمة
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
