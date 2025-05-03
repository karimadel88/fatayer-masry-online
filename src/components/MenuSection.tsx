import React, { useState, useEffect } from "react";
import ProductCard, { Product, Category } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "@/api/products"; // Assume this is the API call function

const MenuSection = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("الكل");

  const defaultImage = "/images/default-product.jpg"; // Path to the default image

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadProducts();
  }, []);

  const categories = [
    "الكل",
    ...new Set(products.map((product) => product.category.name)),
  ];

  const filteredProducts =
    activeCategory === "الكل"
      ? products
      : products.filter((product) => product.category.name === activeCategory);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <section id="menu" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            قائمة الطعام
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            تشكيلة متنوعة من المخبوزات البلدي الأصيلة مثل الفطير، العيش، والقرص
            المخبوزة طازجاً كل يوم
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
              product={{
                ...product,
                image: product.image || defaultImage, // Use default image if none exists
              }}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
