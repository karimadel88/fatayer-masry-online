
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard, { Product } from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from '@/hooks/use-toast';

// بيانات المنتجات للعرض
const productsData: Product[] = [
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
  },
  {
    id: 7,
    name: 'فطير بالسبانخ',
    description: 'فطير محشو بالسبانخ الطازجة مع التوابل المصرية التقليدية',
    price: 40,
    image: '/feteer-spinach.jpg',
    category: 'فطير'
  },
  {
    id: 8,
    name: 'فطير بالبطاطس',
    description: 'فطير محشو بالبطاطس المهروسة المتبلة بالكمون والفلفل الأسود',
    price: 35,
    image: '/feteer-potato.jpg',
    category: 'فطير'
  },
  {
    id: 9,
    name: 'فطير حلو بالقشطة',
    description: 'فطير بالقشطة الطازجة والعسل الأبيض والمكسرات',
    price: 55,
    image: '/feteer-sweet.jpg',
    category: 'فطير حلو'
  },
  {
    id: 10,
    name: 'فطير بالشيكولاتة',
    description: 'فطير محشو بالشيكولاتة الداكنة والبيضاء مع رشة من المكسرات المحمصة',
    price: 60,
    image: '/feteer-chocolate.jpg',
    category: 'فطير حلو'
  }
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>('default');

  const categories = ['الكل', ...Array.from(new Set(productsData.map(product => product.category)))];

  // تطبيق الفلتر والبحث
  useEffect(() => {
    let filteredProducts = [...productsData];
    
    // تطبيق الفلتر حسب الفئة
    if (selectedCategory !== 'الكل') {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }
    
    // تطبيق البحث
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.includes(searchTerm) || 
        product.description.includes(searchTerm)
      );
    }
    
    // تطبيق الترتيب
    if (sortBy === 'price-asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
    
    setProducts(filteredProducts);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    toast({
      title: "تمت الإضافة",
      description: `تم إضافة ${product.name} إلى سلة التسوق`
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero section للمنتجات */}
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">قائمة منتجاتنا</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            تشكيلة متنوعة من الفطير البلدي المصري الأصيل والقرص البلدي المخبوز طازجاً كل يوم
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters للشاشات الكبيرة */}
          <div className="hidden lg:block">
            <Card className="p-4">
              <h2 className="text-xl font-bold mb-4">تصفية المنتجات</h2>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2">الفئات</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className="w-full justify-start text-right"
                    >
                      {category}
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
                    <SelectItem value="price-asc">السعر: من الأقل للأعلى</SelectItem>
                    <SelectItem value="price-desc">السعر: من الأعلى للأقل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </div>
          
          {/* المنتجات وشريط البحث */}
          <div className="lg:col-span-3">
            <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
              <div className="relative w-full md:w-auto md:flex-1">
                <Input
                  type="text"
                  placeholder="ابحث عن منتج..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>

              {/* تبديل الفلاتر للموبايل */}
              <Button 
                variant="outline" 
                className="md:hidden flex items-center gap-2"
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
                <DropdownMenuContent className="w-80" align="end">
                  <div className="p-4">
                    <h3 className="font-bold mb-3">سلة التسوق</h3>
                    
                    {cart.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">السلة فارغة</p>
                    ) : (
                      <>
                        <div className="max-h-64 overflow-y-auto mb-4">
                          {cart.map((item) => (
                            <div key={`${item.id}-${Date.now()}`} className="flex items-center justify-between py-2 border-b">
                              <div className="flex items-center space-x-4 space-x-reverse">
                                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">{item.price} جنيه</p>
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
                        
                        <Button className="w-full">إتمام الطلب</Button>
                      </>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* فلاتر للموبايل */}
            <Collapsible
              open={isMobileFilterOpen}
              onOpenChange={setIsMobileFilterOpen}
              className="mb-6 lg:hidden"
            >
              <CollapsibleContent>
                <Card className="p-4 mb-4">
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">الفئات</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          size="sm"
                          variant={selectedCategory === category ? "default" : "outline"}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
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
                        <SelectItem value="price-asc">السعر: من الأقل للأعلى</SelectItem>
                        <SelectItem value="price-desc">السعر: من الأعلى للأقل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </Card>
              </CollapsibleContent>
            </Collapsible>

            {/* عرض المنتجات */}
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">لم يتم العثور على أي منتجات</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('الكل');
                  }}
                >
                  عرض كل المنتجات
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
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
