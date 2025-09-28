import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Sun, Wind, Droplets, Thermometer, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Weather = () => {
  const { t } = useLanguage();
  const weatherData = {
    location: "नागपुर, महाराष्ट्र",
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    condition: "आंशिक बादल",
    forecast: [
      { day: "आज", temp: "28°C", condition: "बादल", icon: CloudRain },
      { day: "कल", temp: "30°C", condition: "धूप", icon: Sun },
      { day: "परसों", temp: "26°C", condition: "बारिश", icon: CloudRain },
    ]
  };

  const alerts = [
    {
      type: "warning",
      message: "अगले 2 दिनों में भारी बारिश की संभावना - फसल की सुरक्षा करें",
      priority: "high"
    },
    {
      type: "info", 
      message: "मिट्टी में नमी का स्तर अच्छा है - सिंचाई की जरूरत नहीं",
      priority: "medium"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">{t('weather.title')}</h1>
          <p className="text-muted-foreground">{t('weather.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader className="bg-gradient-to-r from-sky-blue to-accent text-primary-foreground">
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="h-6 w-6" />
                {t('weather.currentWeather')} - {weatherData.location}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Thermometer className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                  <p className="text-sm text-muted-foreground">{t('weather.temperature')}</p>
                </div>
                
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Droplets className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{weatherData.humidity}%</p>
                  <p className="text-sm text-muted-foreground">{t('weather.humidity')}</p>
                </div>
                
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Wind className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{weatherData.windSpeed}</p>
                  <p className="text-sm text-muted-foreground">{t('weather.wind')} km/h</p>
                </div>
                
                <div className="text-center p-4 bg-muted rounded-lg">
                  <CloudRain className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-lg font-bold">{weatherData.condition}</p>
                  <p className="text-sm text-muted-foreground">{t('weather.condition')}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {weatherData.forecast.map((day, index) => {
                  const Icon = day.icon;
                  return (
                    <div key={index} className="text-center p-4 border rounded-lg">
                      <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="font-semibold">{day.day}</p>
                      <p className="text-lg">{day.temp}</p>
                      <p className="text-sm text-muted-foreground">{day.condition}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="bg-gradient-to-r from-primary to-harvest-gold text-primary-foreground">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                {t('weather.weatherWarning')}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.priority === 'high' 
                        ? 'border-destructive bg-destructive/10' 
                        : 'border-primary bg-muted'
                    }`}
                  >
                    <p className="text-sm">{alert.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>{t('weather.agriculturalSuggestions')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-sm">बारिश से पहले फसल को ढकने की व्यवस्था करें</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-sm">खेत में पानी की निकासी का इंतजाम करें</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-sm">स्प्रे का काम तेज हवा में न करें</p>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>{t('weather.irrigationAdvice')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded">
                  <p className="font-medium">{t('weather.soilMoisture')}</p>
                  <p className="text-sm text-muted-foreground">{t('weather.irrigationNotNeeded')}</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-accent">
                  {t('weather.setIrrigationReminder')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Weather;