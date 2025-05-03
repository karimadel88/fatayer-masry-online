
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden pattern-bg py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-heading">
              <span className="text-primary">الفطير البلدي</span>{" "}
              <span className="block mt-2">بالسمنة البلدي</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-lg mx-auto md:mr-0">
              مذاق أصيل من الفطير المصري البلدي الطازج يومياً بالسمنة البلدي،
              عجينة هشة ومقرمشة مع حشوات غنية لمذاق لا يُنسى
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Button className="text-lg px-6 py-6 rounded-lg font-bold" size="lg">
                اطلب الآن
              </Button>
              <Button className="text-lg px-6 py-6 rounded-lg font-bold" size="lg" variant="outline">
                تصفح القائمة
              </Button>
            </div>
          </div>
          <div className="flex-1 mt-8 md:mt-0">
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-xl animate-float">
                <img 
                  src="/feteer.jpg" 
                  alt="فطير بلدي شهي" 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1555072956-7758afb20e8f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1287";
                  }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-accent p-4 rounded-lg shadow-lg">
                <div className="text-accent-foreground font-bold">
                  <span className="text-3xl">خبز طازج</span>
                  <span className="block text-lg">يومياً</span>
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
