import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus, MapPin } from "lucide-react";

const Market = () => {
  const marketData = [
    { crop: "गेहूं", price: 2250, change: 5, unit: "क्विंटल", location: "नागपुर मंडी" },
    { crop: "धान", price: 1850, change: -2, unit: "क्विंटल", location: "अकोला मंडी" },
    { crop: "कपास", price: 6200, change: 8, unit: "क्विंटल", location: "यवतमाल मंडी" },
    { crop: "सोयाबीन", price: 4100, change: 0, unit: "क्विंटल", location: "नागपुर मंडी" },
    { crop: "मक्का", price: 1950, change: 3, unit: "क्विंटल", location: "वर्धा मंडी" },
    { crop: "तुअर दाल", price: 5800, change: -5, unit: "क्विंटल", location: "अमरावती मंडी" },
  ];

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">मंडी भाव</h1>
          <p className="text-muted-foreground">आज के बाजार दर और रुझान</p>
        </div>

        <div className="grid gap-4 mb-6">
          {marketData.map((item, index) => (
            <Card key={index} className="shadow-soft hover:shadow-card transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-1">{item.crop}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {item.location}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold">₹{item.price.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">प्रति {item.unit}</div>
                  </div>
                  
                  <div className="text-center ml-6">
                    <div className={`flex items-center justify-center gap-1 ${getTrendColor(item.change)}`}>
                      {getTrendIcon(item.change)}
                      <span className="font-semibold">
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">कल से</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <CardTitle>बाजार विश्लेषण</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">आज का सर्वोत्तम:</h4>
                  <p className="text-green-600 font-medium">कपास (+8%) - ₹6,200/क्विंटल</p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">बेचने का सुझाव:</h4>
                  <p className="text-sm">कपास और मक्का की कीमतें बढ़ रही हैं। अच्छा समय है बेचने के लिए।</p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">खरीदने का सुझाव:</h4>
                  <p className="text-sm">तुअर दाल की कीमत गिरी है। अगली फसल के लिए बीज खरीदने का अच्छा मौका।</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="bg-gradient-to-r from-harvest-gold to-secondary text-primary-foreground">
              <CardTitle>सप्ताह का रुझान</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span>गेहूं</span>
                  <span className="text-green-600 font-medium">↗ +3.2%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span>कपास</span>
                  <span className="text-green-600 font-medium">↗ +5.8%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span>धान</span>
                  <span className="text-red-600 font-medium">↘ -1.5%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span>सोयाबीन</span>
                  <span className="text-gray-600 font-medium">→ 0.0%</span>
                </div>
              </div>
              
              <Button className="w-full mt-4 bg-gradient-to-r from-primary to-accent">
                विस्तृत रिपोर्ट देखें
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Market;