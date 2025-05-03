
import React, { useState } from 'react';
import ProductCard, { Product } from './ProductCard';
import { Button } from '@/components/ui/button';

// Sample data
const products: Product[] = [
  {
    id: 1,
    name: 'فطير سادة بالسمنة البلدي',
    description: 'فطير بلدي طازج على الطريقة المصرية الأصيلة بالسمنة البلدي',
    price: 35,
    image: '/feteer-plain.jpg',
    category: 'فطير'
  },
  {
    id: 2,
    name: 'فطير بالجبنة',
    description: 'فطير مورق محشو بمزيج من الجبنة البيضاء والرومي والموزاريلا',
    price: 45,
    image: '/feteer-cheese.jpg',
    category: 'فطير'
  },
  {
    id: 3,
    name: 'فطير باللحمة المفرومة',
    description: 'فطير مورق محشو باللحمة المفرومة مع البهارات المصرية الأصيلة',
    price: 60,
    image: '/feteer-meat.jpg',
    category: 'فطير'
  },
  {
    id: 4,
    name: 'فطير بالمشروم والجبنة',
    description: 'فطير مورق محشو بالمشروم الطازج وجبنة الموزاريلا الغنية',
    price: 50,
    image: '/feteer-mushroom.jpg',
    category: 'فطير'
  },
  {
    id: 5,
    name: 'قرص عسل',
    description: 'قرص بلدي بالعسل الأبيض النقي، حلو المذاق ومناسب للشاي',
    price: 20,
    image: '/qurs-honey.jpg',
    category: 'قرص'
  },
  {
    id: 6,
    name: 'قرص بالسمسم',
    description: 'قرص طازج مغطى بالسمسم المحمص، مقرمش من الخارج وطري من الداخل',
    price: 15,
    image: '/qurs-sesame.jpg',
    category: 'قرص'
  }
];

const MenuSection = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('الكل');
  
  const categories = ['الكل', ...new Set(products.map(product => product.category))];
  
  const filteredProducts = activeCategory === 'الكل' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <section id="menu" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">قائمة الطعام</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            تشكيلة متنوعة من الفطير البلدي المصري الأصيل والقرص البلدي المخبوز طازجاً كل يوم
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="min-w-24"
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
