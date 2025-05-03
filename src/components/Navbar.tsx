import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleGoToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <header className="bg-background sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary font-heading">
              <Link to="/">فطير كريم</Link>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="font-medium hover:text-primary transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              to="/products"
              className="font-medium hover:text-primary transition-colors"
            >
              قائمة المخبوزات
            </Link>

            <a
              href="/#contact"
              className="font-medium hover:text-primary transition-colors"
            >
              تواصل معنا
            </a>
          </nav>

          {/* Order Button (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>

              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-lg p-4 z-50">
                  <h3 className="font-bold mb-3 text-lg">سلة التسوق</h3>
                  {cart.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      السلة فارغة
                    </p>
                  ) : (
                    <>
                      <ul className="space-y-3">
                        {Object.values(
                          cart.reduce((acc, item) => {
                            if (!acc[item.id]) {
                              acc[item.id] = { ...item, quantity: 0 };
                            }
                            acc[item.id].quantity += 1;
                            return acc;
                          }, {})
                        ).map((item: any) => (
                          <li
                            key={item.id}
                            className="flex justify-between items-center border-b pb-2"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">
                                {item.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {item.price} جنيه × {item.quantity}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-destructive"
                            >
                              ×
                            </Button>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <Button
                          className="w-full py-2 text-lg font-bold"
                          onClick={handleGoToCheckout}
                        >
                          إتمام الطلب
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            <Link to="/products">
              <Button className="font-bold rounded-lg">تصفح القائمة</Button>
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
              <Button className="mt-2 font-bold">تصفح القائمة</Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
