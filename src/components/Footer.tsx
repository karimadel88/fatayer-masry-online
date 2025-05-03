
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-secondary/80 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4 font-heading">فطيرك عندنا</h3>
            <p className="mb-4">
              فطير بلدي طازج على الطريقة المصرية الأصيلة، مخبوز بحب واهتمام يومياً
            </p>
            <p className="text-sm">© {currentYear} فطيرك عندنا - جميع الحقوق محفوظة</p>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">تواصل معنا</h4>
            <address className="not-italic">
              <p className="mb-2">العنوان: شارع المعز، القاهرة، مصر</p>
              <p className="mb-2">هاتف: 01234567890</p>
              <p className="mb-2">البريد الإلكتروني: info@feteerak.com</p>
            </address>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">ساعات العمل</h4>
            <ul className="space-y-2">
              <li>الأحد - الخميس: 8:00 ص - 10:00 م</li>
              <li>الجمعة - السبت: 9:00 ص - 11:00 م</li>
              <li>متاح التوصيل طوال أيام الأسبوع</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
