import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bug, Camera, Upload, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Pest = () => {
  const { t } = useLanguage();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        // Simulate AI analysis
        setTimeout(() => {
          setAnalysis({
            pest: "माहू (एफिड)",
            confidence: 85,
            severity: "मध्यम",
            treatment: [
              "नीम का तेल 2ml प्रति लीटर पानी में मिलाकर छिड़काव करें",
              "इमिडाक्लोप्रिड 0.5ml प्रति लीटर का उपयोग करें",
              "साबुन का घोल (5ml प्रति लीटर) प्राकृतिक उपचार के लिए"
            ],
            prevention: [
              "खेत की नियमित सफाई रखें",
              "पानी का जमाव न होने दें",
              "नीम की पत्तियों का काढ़ा छिड़कें"
            ]
          });
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">{t('pest.title')}</h1>
          <p className="text-muted-foreground">{t('pest.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-6 w-6" />
                {t('pest.uploadPhoto')}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded crop" 
                        className="max-w-full h-48 mx-auto object-cover rounded-lg" 
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => setUploadedImage(null)}
                      >
                        {t('pest.uploadNewPhoto')}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                      <div>
                        <p className="text-lg font-medium">{t('pest.uploadPhoto')}</p>
                        <p className="text-sm text-muted-foreground">
                          {t('pest.uploadInstructions')}
                        </p>
                      </div>
                      
                      <Label htmlFor="image-upload">
                        <Button className="bg-gradient-to-r from-primary to-accent" asChild>
                          <span className="cursor-pointer flex items-center gap-2">
                            <Camera className="h-4 w-4" />
                            {t('pest.chooseFile')}
                          </span>
                        </Button>
                      </Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>

                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="font-medium">{t('pest.betterResults')}</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>{t('pest.clearPhoto')}</li>
                    <li>{t('pest.closeup')}</li>
                    <li>{t('pest.goodLight')}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {analysis && (
            <Card className="shadow-card">
              <CardHeader className="bg-gradient-to-r from-leaf-green to-harvest-gold text-primary-foreground">
                <CardTitle className="flex items-center gap-2">
                  <Bug className="h-6 w-6" />
                  {t('pest.analysisResult')}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-primary">{t('pest.identification')}</h3>
                      <span className="text-sm bg-primary text-primary-foreground px-2 py-1 rounded">
                        {analysis.confidence}% {t('pest.confidence')}
                      </span>
                    </div>
                    <p className="text-lg font-medium">{analysis.pest}</p>
                    <p className="text-sm text-muted-foreground">{t('pest.severity')} {analysis.severity}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {t('pest.treatment')}
                    </h3>
                    <ul className="space-y-2">
                      {analysis.treatment.map((treatment: string, index: number) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          {treatment}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold text-primary mb-3">{t('pest.prevention')}</h3>
                    <ul className="space-y-2">
                      {analysis.prevention.map((prevention: string, index: number) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                          {prevention}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-primary to-accent">
                    {t('pest.saveAdvice')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {!analysis && (
          <Card className="mt-6 shadow-soft">
            <CardHeader>
              <CardTitle>{t('pest.commonPests')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: t('pest.aphid'), treatment: t('pest.neemOilSpray') },
                  { name: t('pest.whitefly'), treatment: t('pest.yellowStickyTrap') },
                  { name: t('pest.podBorer'), treatment: t('pest.btSpray') },
                  { name: t('pest.leafSpot'), treatment: t('pest.copperSulfate') }
                ].map((item, index) => (
                  <div key={index} className="p-3 border rounded-lg text-center hover:bg-muted transition-smooth">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.treatment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Pest;