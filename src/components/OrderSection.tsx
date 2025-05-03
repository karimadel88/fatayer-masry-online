
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const OrderSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: "خطأ في النموذج",
        description: "برجاء ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    // Submit order (in a real app, this would connect to an API)
    console.log('Order submitted:', formData);
    
    toast({
      title: "تم تقديم الطلب بنجاح",
      description: "سنتواصل معك قريباً لتأكيد طلبك",
    });
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      address: '',
      notes: '',
    });
  };

  return (
    <section id="order" className="py-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">اطلب الآن</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اطلب فطيرك الطازج الآن وسيصلك في أسرع وقت، توصيل لجميع المناطق
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="name">
                      الاسم <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="أدخل اسمك بالكامل"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="phone">
                      رقم الهاتف <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="أدخل رقم هاتفك"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="address">
                    العنوان <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="أدخل عنوانك بالتفصيل للتوصيل"
                    required
                    className="min-h-24"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="notes">
                    ملاحظات إضافية
                  </label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="أي تفاصيل إضافية عن طلبك"
                    className="min-h-24"
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full py-6 text-lg font-bold">
                    تأكيد الطلب
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
