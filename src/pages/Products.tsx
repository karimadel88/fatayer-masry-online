import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { fetchProducts } from "@/api/products";
import { useCart } from "@/context/CartContext";

const Products = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
  const [cart, setCart] = useState<Product[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("default");
  const { addToCart } = useCart();

  const categories = [
    { id: 0, name: "الكل" },
    ...Array.from(
      new Map(
        products.map((product) => [product.category.id, product.category])
      ).values()
    ),
  ];

  // Fetch products from the API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        const mappedProducts = fetchedProducts.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          image: product.image || "", // Assuming `image` might be part of the response
        }));
        setProducts(mappedProducts);
      } catch (error) {
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء تحميل المنتجات",
          variant: "destructive",
        });
      }
    };
    loadProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategory === "الكل" ||
        product.category.name === selectedCategory
    )
    .filter(
      (product) =>
        product.name.includes(searchTerm) ||
        product.description.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "تمت الإضافة",
      description: `تم إضافة ${product.name} إلى سلة التسوق`,
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    const index = cart.findIndex((item) => item.id === productId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "السلة فارغة",
        description: "الرجاء إضافة منتجات إلى السلة أولاً",
        variant: "destructive",
      });
      return;
    }

    // Navigate to checkout with cart items
    navigate("/checkout", { state: { orderItems: cart } });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero section للمنتجات */}
      <div className="bg-muted py-6 md:py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-center">
            قائمة منتجاتنا
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            تشكيلة متنوعة من المخبوزات البلدي الأصيلة مثل الفطير، العيش، والقرص
            المخبوزة طازجاً كل يوم
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Filters للشاشات الكبيرة */}
          <div className="hidden lg:block">
            <Card className="p-4 sticky top-20">
              <h2 className="text-xl font-bold mb-4">تصفية المنتجات</h2>

              <div className="mb-4">
                <h3 className="font-medium mb-2">الفئات</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={
                        selectedCategory === category.name
                          ? "default"
                          : "outline"
                      }
                      onClick={() => setSelectedCategory(category.name)}
                      className="w-full justify-start text-right"
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-2">الترتيب حسب</h3>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر الترتيب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">الافتراضي</SelectItem>
                    <SelectItem value="price-asc">
                      السعر: من الأقل للأعلى
                    </SelectItem>
                    <SelectItem value="price-desc">
                      السعر: من الأعلى للأقل
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </div>

          {/* المنتجات وشريط البحث */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row gap-3 mb-4 md:mb-6">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="ابحث عن منتج..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>

              <div className="flex gap-2">
                {/* تبديل الفلاتر للموبايل */}
                <Button
                  variant="outline"
                  className="lg:hidden flex-1 items-center gap-2"
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                >
                  <Filter className="h-4 w-4" />
                  الفلاتر
                </Button>

                {/* عرض العربة */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      {cart.length > 0 && (
                        <span className="absolute -top-2 -left-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                          {cart.length}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[80vw] sm:w-80" align="end">
                    <div className="p-4">
                      <h3 className="font-bold mb-3">سلة التسوق</h3>

                      {cart.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">
                          السلة فارغة
                        </p>
                      ) : (
                        <>
                          <div className="max-h-64 overflow-y-auto mb-4">
                            {cart.map((item) => (
                              <div
                                key={`${item.id}-${Date.now() * Math.random()}`}
                                className="flex items-center justify-between py-2 border-b"
                              >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-10 h-10 object-cover rounded"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">
                                      {item.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {item.price} جنيه
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveFromCart(item.id)}
                                  className="text-destructive"
                                >
                                  ×
                                </Button>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between font-bold mb-4">
                            <span>الإجمالي:</span>
                            <span>{calculateTotal()} جنيه</span>
                          </div>

                          <Button className="w-full" onClick={handleCheckout}>
                            إتمام الطلب
                          </Button>
                        </>
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* فلاتر للموبايل */}
            <Collapsible
              open={isMobileFilterOpen}
              onOpenChange={setIsMobileFilterOpen}
              className="mb-4 lg:hidden"
            >
              <CollapsibleContent>
                <Card className="p-4 mb-4">
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">الفئات</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category.id}
                          size="sm"
                          variant={
                            selectedCategory === category.name
                              ? "default"
                              : "outline"
                          }
                          onClick={() => setSelectedCategory(category.name)}
                        >
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">الترتيب حسب</h3>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر الترتيب" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">الافتراضي</SelectItem>
                        <SelectItem value="price-asc">
                          السعر: من الأقل للأعلى
                        </SelectItem>
                        <SelectItem value="price-desc">
                          السعر: من الأعلى للأقل
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </Card>
              </CollapsibleContent>
            </Collapsible>

            {/* عرض المنتجات */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  لم يتم العثور على أي منتجات
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("الكل");
                  }}
                >
                  عرض كل المنتجات
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
