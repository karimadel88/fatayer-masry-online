import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { Product } from "@/components/ProductCard";
import api from "@/utils/api"; // Import the Axios instance

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, clearCart } = useCart(); // Use clearCart to reset the cart
  const [orderItems, setOrderItems] = useState<Product[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configure toast to auto-dismiss after a set time
  const showToast = ({ title, description, variant = "default" }) => {
    toast({
      title,
      description,
      duration: 5000, // Auto-dismiss after 5 seconds
    });
  };

  useEffect(() => {
    // Get order items from location state or fallback to cart
    if (location.state?.orderItems?.length > 0) {
      // Process orderItems from location state
      const processedItems = processOrderItems(location.state.orderItems);
      setOrderItems(processedItems);
    } else if (cart.length > 0) {
      // Process items from cart
      const processedItems = processOrderItems(cart);
      setOrderItems(processedItems);
    } else {
      // If no items, redirect back to products page
      navigate("/products");
      showToast({
        title: "لا توجد منتجات",
        description: "الرجاء إضافة منتجات إلى سلة التسوق أولاً",
        variant: "destructive",
      });
    }
  }, [location.state, cart, navigate]);

  // Process order items to ensure they are unique and have a quantity
  const processOrderItems = (items: Product[]) => {
    // Group items by id and combine quantities
    const itemMap = new Map<number, Product>();

    items.forEach((item) => {
      const existingItem = itemMap.get(item.id);
      if (existingItem) {
        // If item already exists, add quantities
        const newQuantity = (existingItem.quantity || 1) + (item.quantity || 1);
        itemMap.set(item.id, { ...existingItem, quantity: newQuantity });
      } else {
        // Add new item with default quantity if not present
        itemMap.set(item.id, { ...item, quantity: item.quantity || 1 });
      }
    });

    // Convert the map back to an array
    return Array.from(itemMap.values());
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    // Prevent negative or zero quantities
    const validQuantity = Math.max(1, newQuantity);

    setOrderItems((prevOrderItems) =>
      prevOrderItems.map((item) =>
        item.id === productId ? { ...item, quantity: validQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !phoneNumber || !address) {
      showToast({
        title: "المعلومات غير كاملة",
        description: "الرجاء إكمال جميع البيانات المطلوبة",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: customerName,
        phoneNumber,
        address,
        notes,
        products: orderItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      };

      await api.post("/orders", payload); // Use the Axios instance

      showToast({
        title: "تم إرسال الطلب بنجاح",
        description: "سنتواصل معك قريباً لتأكيد الطلب",
      });

      clearCart(); // Reset the cart after successful submission
      setIsSubmitting(false);
      navigate("/");
    } catch (error) {
      showToast({
        title: "خطأ",
        description: "حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          إتمام الطلب
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
              <CardDescription>
                عدد المنتجات: {orderItems.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table className="w-full border border-border rounded-lg overflow-hidden">
                <TableHeader className="bg-muted">
                  <TableRow>
                    <TableHead className="w-[180px] px-4 py-2 text-right font-semibold">
                      المنتج
                    </TableHead>
                    <TableHead className="px-4 py-2 text-right font-semibold">
                      الكمية
                    </TableHead>
                    <TableHead className="px-4 py-2 text-right font-semibold">
                      السعر
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow
                      key={item.id}
                      className="border-b last:border-none"
                    >
                      <TableCell className="px-4 py-2 text-right">
                        {item.name}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-right">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value, 10)
                            )
                          }
                          className="w-16 text-center"
                        />
                      </TableCell>
                      <TableCell className="px-4 py-2 text-right">
                        {item.price * item.quantity} جنيه
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>الإجمالي:</span>
                  <span>{calculateTotal()} جنيه</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Details Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>تفاصيل التوصيل</CardTitle>
              <CardDescription>أدخل بياناتك للتوصيل</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium" htmlFor="name">
                    الاسم بالكامل
                  </label>
                  <Input
                    id="name"
                    placeholder="الاسم بالكامل"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium" htmlFor="phone">
                    رقم الهاتف
                  </label>
                  <Input
                    id="phone"
                    placeholder="رقم الهاتف"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium"
                    htmlFor="address"
                  >
                    العنوان
                  </label>
                  <Input
                    id="address"
                    placeholder="العنوان"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium" htmlFor="notes">
                    ملاحظات إضافية
                  </label>
                  <Textarea
                    id="notes"
                    placeholder="ملاحظات إضافية للطلب"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "جاري إرسال الطلب..." : "تأكيد الطلب"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
