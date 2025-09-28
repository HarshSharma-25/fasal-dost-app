import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Mic, Volume2, HelpCircle, Phone, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Chat = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: t('chat.welcomeMessage'),
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user" as const,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: t('chat.botThinking'),
        sender: "bot" as const,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">{t('chat.title')}</h1>
          <p className="text-muted-foreground">{t('chat.subtitle')}</p>
        </div>

        <Card className="shadow-card">
          <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              {t('chat.aiAssistant')}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Mic className="h-4 w-4" />
                </Button>
                <Input
                  placeholder={t('chat.placeholder')}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-gradient-to-r from-primary to-accent">
                  <Send className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{t('chat.suggestedQuestions')}</h3>
              <ul className="space-y-2 text-sm">
                <li className="cursor-pointer hover:text-primary">• इस मौसम में कौन सी फसल बोऊं?</li>
                <li className="cursor-pointer hover:text-primary">• काली मिट्टी के लिए कौन सा खाद बेहतर है?</li>
                <li className="cursor-pointer hover:text-primary">• गेहूं के बाद कौन सी फसल लगाऊं?</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{t('chat.languageSupport')}</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">हिंदी</Button>
                <Button variant="outline" size="sm">English</Button>
                <Button variant="outline" size="sm">ਪੰਜਾਬੀ</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Help Desk Section */}
        <Card className="mt-6 shadow-card">
          <CardHeader className="bg-gradient-to-r from-accent to-secondary text-primary-foreground">
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-6 w-6" />
              हेल्प डेस्क सहायता
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg hover:bg-muted transition-smooth">
                <Phone className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">फोन सहायता</h3>
                <p className="text-sm text-muted-foreground mb-3">1800-XXX-XXXX</p>
                <Button variant="outline" size="sm">कॉल करें</Button>
              </div>
              
              <div className="text-center p-4 border rounded-lg hover:bg-muted transition-smooth">
                <MessageSquare className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">व्हाट्सऐप चैट</h3>
                <p className="text-sm text-muted-foreground mb-3">+91-XXXXX-XXXXX</p>
                <Button variant="outline" size="sm">चैट करें</Button>
              </div>
              
              <div className="text-center p-4 border rounded-lg hover:bg-muted transition-smooth">
                <MessageCircle className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">लाइव चैट</h3>
                <p className="text-sm text-muted-foreground mb-3">तुरंत जवाब</p>
                <Button variant="outline" size="sm">शुरू करें</Button>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">सहायता के घंटे:</h4>
              <p className="text-sm">सोमवार से शनिवार: सुबह 8:00 से रात 8:00 तक</p>
              <p className="text-sm">रविवार: सुबह 10:00 से शाम 6:00 तक</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;