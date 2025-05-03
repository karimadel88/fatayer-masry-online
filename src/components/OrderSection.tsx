import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import api from "@/utils/api"; // Axios instance

const ContactUsSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    inquiry: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.inquiry
    ) {
      toast({
        title: "خطأ في النموذج",
        description: "برجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post("/contacts", formData);
      toast({
        title: "تم إرسال الاستفسار بنجاح",
        description: "سنتواصل معك قريباً",
      });
      setFormData({
        name: "",
        phone: "",
        address: "",
        inquiry: "",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إرسال الاستفسار. حاول مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            تواصل معنا
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اترك استفسارك وسنقوم بالتواصل معك في أقرب وقت ممكن
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="address">
                    العنوان <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="أدخل عنوانك بالتفصيل"
                    required
                    className="min-h-24"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="inquiry">
                    الاستفسار <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="inquiry"
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    placeholder="أدخل استفسارك هنا"
                    required
                    className="min-h-24"
                  />
                </div>
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full py-6 text-lg font-bold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "جاري الإرسال..." : "إرسال الاستفسار"}
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

export default ContactUsSection;
