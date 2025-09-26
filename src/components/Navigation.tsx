import { Link, useLocation } from "react-router-dom";
import { 
  MessageCircle, 
  Sprout, 
  CloudRain, 
  TrendingUp, 
  Bug, 
  FileText, 
  MessageSquare,
  Home,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { path: "/", icon: Home, key: "nav.home" },
    { path: "/chat", icon: MessageCircle, key: "nav.advisory" },
    { path: "/soil", icon: Sprout, key: "nav.soil" },
    { path: "/weather", icon: CloudRain, key: "nav.weather" },
    { path: "/market", icon: TrendingUp, key: "nav.market" },
    { path: "/pest", icon: Bug, key: "nav.pest" },
    { path: "/schemes", icon: FileText, key: "nav.schemes" },
    { path: "/feedback", icon: MessageSquare, key: "nav.feedback" },
  ];

  return (
    <nav className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8" />
            <span className="font-bold text-lg">SmartCrop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center px-3 py-2 rounded-lg transition-smooth hover:bg-white/10 ${
                    isActive ? "bg-white/20" : ""
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs mt-1">{t(item.key)}</span>
                </Link>
              );
            })}
            <LanguageToggle />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-primary-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary">
              <div className="flex items-center justify-between mb-6">
                <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <Sprout className="h-8 w-8 text-accent" />
                  <span className="font-bold text-lg text-primary-foreground">SmartCrop</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6 text-primary-foreground" />
                </Button>
              </div>
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth hover:bg-white/10 text-primary-foreground ${
                        isActive ? "bg-white/20" : ""
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{t(item.key)}</span>
                    </Link>
                  );
                })}
                <div className="px-4 py-3">
                  <LanguageToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;