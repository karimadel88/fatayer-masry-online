
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const NotFound = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-muted/30 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 md:mb-6">404</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة</p>
          <Link to="/">
            <Button size={isMobile ? "default" : "lg"} className="gap-2">
              <Home size={isMobile ? 16 : 18} />
              العودة للصفحة الرئيسية
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
