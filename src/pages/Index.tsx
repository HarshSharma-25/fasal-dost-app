import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageCircle, 
  Sprout, 
  CloudRain, 
  TrendingUp, 
  Bug, 
  FileText, 
  Users,
  Award,
  Globe,
  ArrowRight,
  Smartphone,
  Mic
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI कृषि सलाहकार",
      description: "24/7 उपलब्ध बुद्धिमान सलाहकार जो आपके सवालों का तुरंत जवाब देता है",
      link: "/chat",
      color: "from-primary to-accent"
    },
    {
      icon: Sprout,
      title: "मिट्टी और खाद सलाह",
      description: "अपनी मिट्टी की जांच करें और सही खाद की व्यक्तिगत सिफारिश पाएं",
      link: "/soil",
      color: "from-soil-brown to-secondary"
    },
    {
      icon: CloudRain,
      title: "मौसम पूर्वानुमान",
      description: "सटीक मौसम की जानकारी और कृषि के लिए विशेष सुझाव",
      link: "/weather",
      color: "from-sky-blue to-accent"
    },
    {
      icon: TrendingUp,
      title: "बाजार भाव",
      description: "वर्तमान मंडी दरें और भविष्य के रुझान की जानकारी",
      link: "/market",
      color: "from-harvest-gold to-secondary"
    },
    {
      icon: Bug,
      title: "कीट पहचान",
      description: "फोटो अपलोड करें और तुरंत कीट/रोग की पहचान और इलाज पाएं",
      link: "/pest",
      color: "from-leaf-green to-accent"
    },
    {
      icon: FileText,
      title: "सरकारी योजनाएं",
      description: "किसानों के लिए उपलब्ध सभी सरकारी योजनाओं की विस्तृत जानकारी",
      link: "/schemes",
      color: "from-primary to-harvest-gold"
    }
  ];

  const stats = [
    { number: "50,000+", label: "पंजीकृत किसान", icon: Users },
    { number: "95%", label: "संतुष्ट उपयोगकर्ता", icon: Award },
    { number: "12", label: "राज्यों में सेवा", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-harvest-gold py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              स्मार्ट <span className="text-harvest-gold">कृषि सलाह</span> सिस्टम
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              AI तकनीक से लैस, किसानों के लिए बनाया गया एक संपूर्ण समाधान
            </p>
            <p className="text-lg mb-10 opacity-80">
              फसल, मिट्टी, मौसम, बाजार - सब कुछ एक ही जगह। आसान भाषा में, आपकी सुविधा के अनुसार।
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chat">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  सलाह शुरू करें
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                <Smartphone className="mr-2 h-5 w-5" />
                ऐप डाउनलोड करें
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center shadow-soft hover:shadow-card transition-smooth">
                  <CardContent className="p-8">
                    <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              आपकी खेती के लिए सबकुछ
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              आधुनिक तकनीक और पारंपरिक ज्ञान का मेल, हर किसान की सफलता के लिए
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.link}>
                  <Card className="h-full shadow-card hover:shadow-lg transition-smooth group cursor-pointer">
                    <CardHeader className={`bg-gradient-to-r ${feature.color} text-primary-foreground`}>
                      <div className="flex items-center gap-3">
                        <Icon className="h-8 w-8" />
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground group-hover:text-foreground transition-smooth">
                        {feature.description}
                      </p>
                      <div className="flex items-center mt-4 text-primary group-hover:translate-x-2 transition-smooth">
                        <span className="mr-2">शुरू करें</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Language & Accessibility Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">
              हर किसान के लिए आसान
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="shadow-soft">
                <CardContent className="p-8">
                  <Globe className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">बहुभाषी सपोर्ट</h3>
                  <p className="text-muted-foreground mb-4">
                    हिंदी, मराठी, गुजराती, अंग्रेजी और अन्य स्थानीय भाषाओं में उपलब्ध
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">हिंदी</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">मराठी</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">English</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">गुजराती</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="p-8">
                  <Mic className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">आवाज सहायता</h3>
                  <p className="text-muted-foreground mb-4">
                    बोलकर सवाल पूछें और आवाज में जवाब सुनें। पढ़ना-लिखना न आए तो भी कोई समस्या नहीं
                  </p>
                  <Button className="bg-gradient-to-r from-primary to-accent">
                    <Mic className="mr-2 h-4 w-4" />
                    आवाज में पूछें
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            आज ही शुरू करें अपनी स्मार्ट खेती
          </h2>
          <p className="text-xl mb-8 opacity-90">
            हजारों किसान भाई पहले से ही उपयोग कर रहे हैं। आप भी जुड़िए।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/chat">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
                <MessageCircle className="mr-2 h-5 w-5" />
                अभी सलाह लें
              </Button>
            </Link>
            <Link to="/feedback">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                अपनी राय दें
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sprout className="h-8 w-8" />
                <span className="text-xl font-bold">SmartCrop</span>
              </div>
              <p className="opacity-80">
                किसानों के लिए, किसानों के साथ। आधुनिक तकनीक से बेहतर खेती।
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">सेवाएं</h3>
              <ul className="space-y-2 opacity-80">
                <li><Link to="/chat" className="hover:opacity-100">कृषि सलाह</Link></li>
                <li><Link to="/weather" className="hover:opacity-100">मौसम पूर्वानुमान</Link></li>
                <li><Link to="/market" className="hover:opacity-100">बाजार भाव</Link></li>
                <li><Link to="/schemes" className="hover:opacity-100">सरकारी योजनाएं</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">सहायता</h3>
              <ul className="space-y-2 opacity-80">
                <li><Link to="/feedback" className="hover:opacity-100">संपर्क करें</Link></li>
                <li><a href="#" className="hover:opacity-100">हेल्प सेंटर</a></li>
                <li><a href="#" className="hover:opacity-100">व्हाट्सऐप सपोर्ट</a></li>
                <li><a href="#" className="hover:opacity-100">टोल फ्री नंबर</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">अपडेट पाएं</h3>
              <p className="opacity-80 mb-4">नई सुविधाओं की जानकारी सबसे पहले पाएं</p>
              <Button className="bg-white text-primary hover:bg-white/90">
                व्हाट्सऐप ज्वाइन करें
              </Button>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center opacity-80">
            <p>&copy; 2024 SmartCrop Advisory System. सभी अधिकार सुरक्षित।</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;