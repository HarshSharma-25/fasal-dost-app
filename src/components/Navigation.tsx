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

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", label: "होम", icon: Home, labelEn: "Home" },
    { path: "/chat", label: "सलाह", icon: MessageCircle, labelEn: "Advisory" },
    { path: "/soil", label: "मिट्टी", icon: Sprout, labelEn: "Soil" },
    { path: "/weather", label: "मौसम", icon: CloudRain, labelEn: "Weather" },
    { path: "/market", label: "बाजार", icon: TrendingUp, labelEn: "Market" },
    { path: "/pest", label: "कीट", icon: Bug, labelEn: "Pest" },
    { path: "/schemes", label: "योजना", icon: FileText, labelEn: "Schemes" },
    { path: "/feedback", label: "राय", icon: MessageSquare, labelEn: "Feedback" },
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
          <div className="hidden md:flex space-x-1">
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
                  <span className="text-xs mt-1">{item.labelEn}</span>
                </Link>
              );
            })}
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
                      <div className="flex flex-col">
                        <span className="font-medium">{item.labelEn}</span>
                        <span className="text-sm opacity-75">{item.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;