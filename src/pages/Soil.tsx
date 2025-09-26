import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sprout, TestTube, Leaf } from "lucide-react";
import { useState } from "react";

const Soil = () => {
  const [recommendations, setRecommendations] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setRecommendations({
      soilType: "काली मिट्टी",
      npk: "120:60:40",
      organic: "गोबर की खाद 5 टन/एकड़",
      additives: "नीम की खली, कम्पोस्ट"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">मिट्टी और खाद सलाह</h1>
          <p className="text-muted-foreground">अपनी मिट्टी की जांच करें और सही खाद की सलाह पाएं</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader className="bg-gradient-to-r from-soil-brown to-secondary text-primary-foreground">
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-6 w-6" />
                मिट्टी परीक्षण फॉर्म
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="location">खेत का स्थान</Label>
                  <Input id="location" placeholder="जिला, तहसील, गांव" />
                </div>

                <div>
                  <Label htmlFor="soilType">मिट्टी का प्रकार</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="मिट्टी का प्रकार चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">काली मिट्टी (Black Soil)</SelectItem>
                      <SelectItem value="red">लाल मिट्टी (Red Soil)</SelectItem>
                      <SelectItem value="alluvial">जलोढ़ मिट्टी (Alluvial)</SelectItem>
                      <SelectItem value="sandy">बलुई मिट्टी (Sandy)</SelectItem>
                      <SelectItem value="clay">चिकनी मिट्टी (Clay)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="previousCrop">पिछली फसल</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="पिछली फसल चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">गेहूं</SelectItem>
                      <SelectItem value="rice">धान</SelectItem>
                      <SelectItem value="cotton">कपास</SelectItem>
                      <SelectItem value="sugarcane">गन्ना</SelectItem>
                      <SelectItem value="soybean">सोयाबीन</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="nextCrop">अगली फसल</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="बोने वाली फसल चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">गेहूं</SelectItem>
                      <SelectItem value="rice">धान</SelectItem>
                      <SelectItem value="cotton">कपास</SelectItem>
                      <SelectItem value="vegetables">सब्जी</SelectItem>
                      <SelectItem value="pulses">दालें</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="area">खेत का क्षेत्रफल (एकड़)</Label>
                  <Input id="area" type="number" placeholder="1.5" />
                </div>

                <div>
                  <Label htmlFor="issues">समस्याएं (यदि कोई हो)</Label>
                  <Textarea 
                    id="issues" 
                    placeholder="फसल में दिखने वाली समस्याएं लिखें..."
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent">
                  <Sprout className="h-4 w-4 mr-2" />
                  सलाह प्राप्त करें
                </Button>
              </form>
            </CardContent>
          </Card>

          {recommendations && (
            <Card className="shadow-card">
              <CardHeader className="bg-gradient-to-r from-leaf-green to-accent text-primary-foreground">
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-6 w-6" />
                  खाद की सिफारिश
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">मिट्टी का प्रकार:</h3>
                    <p>{recommendations.soilType}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">NPK अनुपात:</h3>
                    <p className="font-mono text-lg">{recommendations.npk}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">जैविक खाद:</h3>
                    <p>{recommendations.organic}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">अतिरिक्त सामग्री:</h3>
                    <p>{recommendations.additives}</p>
                  </div>

                  <Button className="w-full" variant="outline">
                    सलाह डाउनलोड करें
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Soil;