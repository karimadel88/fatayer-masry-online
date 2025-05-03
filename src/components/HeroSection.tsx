import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden pattern-bg py-12 md:py-24 flex items-center justify-center h-auto md:h-screen"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div className="flex-1 text-center md:text-right">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight font-heading">
              <span className="text-primary">الفطير البلدي</span>{" "}
              <span className="block mt-2">من فطير كريم</span>
            </h1>
            <p className="text-base md:text-xl mb-6 md:mb-8 text-muted-foreground max-w-md mx-auto md:mr-0">
              مذاق أصيل من الفطير المصري البلدي الطازج يومياً بالسمنة البلدي،
              عجينة هشة ومقرمشة مع حشوات غنية لمذاق لا يُنسى
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
              <Link to="/#contact">
                <Button
                  className="text-base md:text-lg px-4 md:px-6 py-4 md:py-6 rounded-lg font-bold"
                  size="lg"
                >
                  اطلب الآن
                </Button>
              </Link>
              <Link to="/products">
                <Button
                  className="text-base md:text-lg px-4 md:px-6 py-4 md:py-6 rounded-lg font-bold"
                  size="lg"
                  variant="outline"
                >
                  تصفح القائمة
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 mt-6 md:mt-0">
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl shadow-lg animate-float">
                <img
                  src="../../assets/f1.jpg"
                  alt="فطير بلدي شهي"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1555072956-7758afb20e8f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1287";
                  }}
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-accent p-3 md:p-4 rounded-lg shadow-lg">
                <div className="text-accent-foreground font-bold text-sm md:text-base">
                  <span className="text-xl md:text-3xl">خبز طازج</span>
                  <span className="block text-sm md:text-lg">يومياً</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
