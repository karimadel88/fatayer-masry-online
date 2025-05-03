
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/components/ProductCard';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderItems, setOrderItems] = useState<Product[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get order items from location state
    if (location.state?.orderItems) {
      setOrderItems(location.state.orderItems);
    } else {
      // If no items, redirect back to products page
      navigate('/products');
      toast({
        title: "لا توجد منتجات",
        description: "الرجاء إضافة منتجات إلى سلة التسوق أولاً",
        variant: "destructive"
      });
    }
  }, [location.state, navigate]);

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price, 0);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || !phoneNumber || !address) {
      toast({
        title: "المعلومات غير كاملة",
        description: "الرجاء إكمال جميع البيانات المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Here you would normally send the order to your backend
    // For now, we'll simulate a successful order submission
    setTimeout(() => {
      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سنتواصل معك قريباً لتأكيد الطلب"
      });
      setIsSubmitting(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">إتمام الطلب</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
              <CardDescription>عدد المنتجات: {orderItems.length}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">المنتج</TableHead>
                    <TableHead className="text-left">السعر</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={`${item.id}-${Date.now() * Math.random()}`}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.price} جنيه</TableCell>
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
                  <label className="block text-sm font-medium" htmlFor="name">الاسم بالكامل</label>
                  <Input
                    id="name"
                    placeholder="الاسم بالكامل"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium" htmlFor="phone">رقم الهاتف</label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="رقم الهاتف"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium" htmlFor="address">العنوان بالتفصيل</label>
                  <Textarea
                    id="address"
                    placeholder="العنوان بالتفصيل للتوصيل"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium" htmlFor="notes">ملاحظات إضافية (اختياري)</label>
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
                  {isSubmitting ? 'جاري إرسال الطلب...' : 'تأكيد الطلب'}
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
