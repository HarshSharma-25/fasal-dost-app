import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Mic, Star, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "फीडबैक भेजा गया!",
      description: "आपकी राय हमारे लिए महत्वपूर्ण है। धन्यवाद!",
    });
  };

  const handleVoiceRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "आवाज रिकॉर्डिंग शुरू",
        description: "अपनी राय बोलें...",
      });
    } else {
      toast({
        title: "रिकॉर्डिंग बंद",
        description: "आपकी आवाज सेव हो गई है।",
      });
    }
  };

  const StarRating = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 cursor-pointer transition-colors ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">{t('feedback.title')}</h1>
          <p className="text-muted-foreground">{t('feedback.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6" />
                फीडबैक फॉर्म
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">नाम</Label>
                  <Input id="name" placeholder="आपका नाम" />
                </div>

                <div>
                  <Label htmlFor="phone">मोबाइल नंबर</Label>
                  <Input id="phone" type="tel" placeholder="10 अंकों का मोबाइल नंबर" />
                </div>

                <div>
                  <Label htmlFor="location">स्थान</Label>
                  <Input id="location" placeholder="जिला, राज्य" />
                </div>

                <div>
                  <Label htmlFor="category">फीडबैक श्रेणी</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="श्रेणी चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="advisory">कृषि सलाह</SelectItem>
                      <SelectItem value="weather">मौसम जानकारी</SelectItem>
                      <SelectItem value="market">बाजार दर</SelectItem>
                      <SelectItem value="pest">कीट पहचान</SelectItem>
                      <SelectItem value="schemes">सरकारी योजनाएं</SelectItem>
                      <SelectItem value="app">ऐप उपयोग</SelectItem>
                      <SelectItem value="other">अन्य</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>रेटिंग</Label>
                  <div className="mt-2">
                    <StarRating />
                    <p className="text-sm text-muted-foreground mt-2">
                      {rating > 0 && `${rating}/5 स्टार`}
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="feedback">विस्तृत राय</Label>
                  <Textarea
                    id="feedback"
                    placeholder="अपनी राय, सुझाव या समस्या यहां लिखें..."
                    rows={5}
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-accent">
                    <Send className="h-4 w-4 mr-2" />
                    भेजें
                  </Button>
                  
                  <Button
                    type="button"
                    variant={isRecording ? "destructive" : "outline"}
                    onClick={handleVoiceRecording}
                    className="px-6"
                  >
                    <Mic className="h-4 w-4" />
                    {isRecording ? " रुकें" : " बोलें"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="bg-gradient-to-r from-harvest-gold to-secondary text-primary-foreground">
              <CardTitle>हाल की राय</CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    name: "राजेश पाटील",
                    location: "नागपुर",
                    rating: 5,
                    comment: "बहुत अच्छी सेवा है। मौसम की जानकारी बिल्कुल सही मिलती है।",
                    date: "2 दिन पहले"
                  },
                  {
                    name: "सुनीता देवी",
                    location: "अकोला", 
                    rating: 4,
                    comment: "कीट पहचान की सुविधा बहुत काम आई। धन्यवाद!",
                    date: "5 दिन पहले"
                  },
                  {
                    name: "विकास जाधव",
                    location: "यवतमाल",
                    rating: 5,
                    comment: "मंडी के भाव की सटीक जानकारी मिलती है।",
                    date: "1 सप्ताह पहले"
                  }
                ].map((review, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-sm text-muted-foreground">{review.location}</p>
                      </div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm mb-2">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 shadow-soft">
          <CardHeader>
            <CardTitle>हमसे संपर्क करें</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <h3 className="font-semibold mb-2">फोन</h3>
                <p className="text-primary">1800-XXX-XXXX</p>
                <p className="text-sm text-muted-foreground">टोल फ्री</p>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">व्हाट्सऐप</h3>
                <p className="text-primary">+91-XXXXX-XXXXX</p>
                <p className="text-sm text-muted-foreground">24/7 उपलब्ध</p>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">ईमेल</h3>
                <p className="text-primary">support@smartcrop.gov.in</p>
                <p className="text-sm text-muted-foreground">तुरंत जवाब</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Feedback;