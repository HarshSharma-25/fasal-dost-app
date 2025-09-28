import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Bell, Calendar, ExternalLink, Heart } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Schemes = () => {
  const { t } = useLanguage();
  const [favoriteSchemes, setFavoriteSchemes] = useState<number[]>([]);

  const schemes = [
    {
      id: 1,
      title: "प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)",
      description: "सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की आर्थिक सहायता",
      amount: "₹6,000/वर्ष",
      deadline: "2024-03-31",
      status: "active",
      category: "वित्तीय सहायता",
      eligibility: "2 हेक्टेयर तक की कृषि भूमि वाले किसान",
      documents: ["आधार कार्ड", "बैंक खाता", "भूमि रिकॉर्ड"]
    },
    {
      id: 2,
      title: "किसान क्रेडिट कार्ड योजना (KCC)",
      description: "कम ब्याज दर पर कृषि ऋण उपलब्ध कराना",
      amount: "₹3 लाख तक",
      deadline: "2024-06-30", 
      status: "active",
      category: "ऋण योजना",
      eligibility: "सभी किसान (भूमिधारक और किराएदार)",
      documents: ["आधार कार्ड", "पैन कार्ड", "भूमि दस्तावेज", "आय प्रमाण पत्र"]
    },
    {
      id: 3,
      title: "प्रधानमंत्री फसल बीमा योजना (PMFBY)",
      description: "प्राकृतिक आपदाओं से फसल हानि का बीमा कवरेज",
      amount: "बीमा राशि फसल के आधार पर",
      deadline: "2024-04-15",
      status: "upcoming",
      category: "बीमा योजना", 
      eligibility: "सभी किसान (भूमिधारक और किराएदार)",
      documents: ["आधार कार्ड", "भूमि दस्तावेज", "बैंक खाता", "बुआई प्रमाण पत्र"]
    },
    {
      id: 4,
      title: "मृदा स्वास्थ्य कार्ड योजना",
      description: "मिट्टी की जांच और पोषक तत्वों की जानकारी",
      amount: "निःशुल्क",
      deadline: "सालभर उपलब्ध",
      status: "active",
      category: "तकनीकी सहायता",
      eligibility: "सभी किसान",
      documents: ["आधार कार्ड", "भूमि दस्तावेज"]
    }
  ];

  const toggleFavorite = (schemeId: number) => {
    setFavoriteSchemes(prev => 
      prev.includes(schemeId) 
        ? prev.filter(id => id !== schemeId)
        : [...prev, schemeId]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">सक्रिय</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">आगामी</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">समाप्त</Badge>;
      default:
        return <Badge variant="secondary">अज्ञात</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">{t('schemes.title')}</h1>
          <p className="text-muted-foreground">{t('schemes.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="shadow-soft">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">{t('schemes.totalSchemes')}</h3>
              <p className="text-2xl font-bold text-primary">{schemes.length}</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6 text-center">
              <Bell className="h-8 w-8 mx-auto mb-3 text-accent" />
              <h3 className="font-semibold mb-2">{t('schemes.activeSchemes')}</h3>
              <p className="text-2xl font-bold text-accent">
                {schemes.filter(s => s.status === 'active').length}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-3 text-red-500" />
              <h3 className="font-semibold mb-2">{t('schemes.favorites')}</h3>
              <p className="text-2xl font-bold text-red-500">{favoriteSchemes.length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {schemes.map((scheme) => (
            <Card key={scheme.id} className="shadow-card hover:shadow-lg transition-smooth">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{scheme.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusBadge(scheme.status)}
                      <Badge variant="outline">{scheme.category}</Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(scheme.id)}
                    className={favoriteSchemes.includes(scheme.id) ? "text-red-500" : ""}
                  >
                    <Heart className={`h-5 w-5 ${favoriteSchemes.includes(scheme.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">{t('schemes.description')}</h4>
                      <p className="text-sm text-muted-foreground">{scheme.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">{t('schemes.benefitAmount')}</h4>
                      <p className="text-lg font-bold text-primary">{scheme.amount}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">{t('schemes.deadline')}</h4>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{scheme.deadline}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">{t('schemes.eligibility')}</h4>
                      <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">{t('schemes.requiredDocuments')}</h4>
                      <ul className="text-sm space-y-1">
                        {scheme.documents.map((doc, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-primary to-accent">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t('schemes.apply')}
                      </Button>
                      <Button variant="outline" className="flex-1">
                        {t('schemes.viewDetails')}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 shadow-soft">
          <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-6 w-6" />
              {t('schemes.updateAlert')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-4">नई योजनाओं और अपडेट की सूचना पाने के लिए अलर्ट सेटअप करें</p>
            <Button className="bg-gradient-to-r from-primary to-accent">
              {t('schemes.enableAlert')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schemes;