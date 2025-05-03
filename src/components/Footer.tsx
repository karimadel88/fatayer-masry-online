
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-secondary/80 text-secondary-foreground scroll-mt-20">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className="mb-6 sm:mb-0">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 font-heading">فطير ام كريم</h3>
            <p className="mb-4 text-sm md:text-base">
              فطير بلدي طازج على الطريقة المصرية الأصيلة، مخبوز بحب واهتمام يومياً
            </p>
            <p className="text-xs md:text-sm">© {currentYear} فطير ام كريم - جميع الحقوق محفوظة</p>
          </div>
          
          <div className="mb-6 sm:mb-0">
            <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4">تواصل معنا</h4>
            <address className="not-italic text-sm md:text-base">
              <p className="mb-2">العنوان: شارع المعز، القاهرة، مصر</p>
              <p className="mb-2">هاتف: 01234567890</p>
              <p className="mb-2">البريد الإلكتروني: info@feteerak.com</p>
            </address>
          </div>
          
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4">ساعات العمل</h4>
            <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
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
