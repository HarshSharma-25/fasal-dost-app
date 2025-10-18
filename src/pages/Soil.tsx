import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sprout, TestTube, Leaf } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Soil = () => {
  const { t } = useLanguage();
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
          <h1 className="text-3xl font-bold text-primary mb-2">{t('soil.title')}</h1>
          <p className="text-muted-foreground">{t('soil.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader className="bg-gradient-to-r from-soil-brown to-secondary text-primary-foreground">
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-6 w-6" />
                {t('soil.testForm')}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="location">{t('soil.location')}</Label>
                  <Input id="location" placeholder={t('soil.locationPlaceholder')} />
                </div>

                <div>
                  <Label htmlFor="soilType">{t('soil.soilType')}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('soil.selectSoilType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">{t('soil.blackSoil')}</SelectItem>
                      <SelectItem value="red">{t('soil.redSoil')}</SelectItem>
                      <SelectItem value="alluvial">{t('soil.alluvial')}</SelectItem>
                      <SelectItem value="sandy">{t('soil.sandy')}</SelectItem>
                      <SelectItem value="clay">{t('soil.clay')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="previousCrop">{t('soil.previousCrop')}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('soil.selectPreviousCrop')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">{t('soil.wheat')}</SelectItem>
                      <SelectItem value="rice">{t('soil.rice')}</SelectItem>
                      <SelectItem value="cotton">{t('soil.cotton')}</SelectItem>
                      <SelectItem value="sugarcane">{t('soil.sugarcane')}</SelectItem>
                      <SelectItem value="soybean">{t('soil.soybean')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="nextCrop">{t('soil.nextCrop')}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('soil.selectNextCrop')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">{t('soil.wheat')}</SelectItem>
                      <SelectItem value="rice">{t('soil.rice')}</SelectItem>
                      <SelectItem value="cotton">{t('soil.cotton')}</SelectItem>
                      <SelectItem value="vegetables">{t('soil.vegetables')}</SelectItem>
                      <SelectItem value="pulses">{t('soil.pulses')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="area">{t('soil.area')}</Label>
                  <Input id="area" type="number" placeholder="1.5" />
                </div>

                <div>
                  <Label htmlFor="issues">{t('soil.issues')}</Label>
                  <Textarea 
                    id="issues" 
                    placeholder={t('soil.issuesPlaceholder')}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent">
                  <Sprout className="h-4 w-4 mr-2" />
                  {t('soil.getAdvice')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {recommendations && (
            <Card className="shadow-card">
              <CardHeader className="bg-gradient-to-r from-leaf-green to-accent text-primary-foreground">
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-6 w-6" />
                  {t('soil.recommendation')}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">{t('soil.soilTypeLabel')}</h3>
                    <p>{recommendations.soilType}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">{t('soil.npkRatio')}</h3>
                    <p className="font-mono text-lg">{recommendations.npk}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">{t('soil.organicFertilizer')}</h3>
                    <p>{recommendations.organic}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">{t('soil.additives')}</h3>
                    <p>{recommendations.additives}</p>
                  </div>

                  <Button className="w-full" variant="outline">
                    {t('soil.downloadAdvice')}
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