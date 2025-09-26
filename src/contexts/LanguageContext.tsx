import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'pa';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('hi');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('smartcrop-language') as Language;
    if (savedLanguage && ['en', 'hi', 'pa'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('smartcrop-language', lang);
  };

  const t = (key: string): string => {
    const translations = getTranslations(currentLanguage);
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const getTranslations = (language: Language): Record<string, string> => {
  const translations = {
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.advisory': 'Advisory',
      'nav.soil': 'Soil',
      'nav.weather': 'Weather',
      'nav.market': 'Market',
      'nav.pest': 'Pest',
      'nav.schemes': 'Schemes',
      'nav.feedback': 'Feedback',
      
      // Home page
      'home.title': 'Smart Crop Advisory System',
      'home.subtitle': 'AI-powered, comprehensive solution for farmers',
      'home.description': 'Crop, soil, weather, market - everything in one place. In simple language, as per your convenience.',
      'home.startAdvice': 'Start Advisory',
      'home.downloadApp': 'Download App',
      'home.statsTitle': 'Everything for your farming',
      'home.statsSubtitle': 'A blend of modern technology and traditional knowledge, for every farmer\'s success',
      'home.feature.aiAdvisor': 'AI Agricultural Advisor',
      'home.feature.aiAdvisorDesc': '24/7 available intelligent advisor that answers your questions instantly',
      'home.feature.soilAdvice': 'Soil and Fertilizer Advice',
      'home.feature.soilAdviceDesc': 'Test your soil and get personalized fertilizer recommendations',
      'home.feature.weatherForecast': 'Weather Forecast',
      'home.feature.weatherForecastDesc': 'Accurate weather information and special suggestions for agriculture',
      'home.feature.marketPrices': 'Market Prices',
      'home.feature.marketPricesDesc': 'Current mandi rates and future trend information',
      'home.feature.pestIdentification': 'Pest Identification',
      'home.feature.pestIdentificationDesc': 'Upload photo and get instant pest/disease identification and treatment',
      'home.feature.govSchemes': 'Government Schemes',
      'home.feature.govSchemesDesc': 'Detailed information about all government schemes available for farmers',
      'home.easyForFarmers': 'Easy for every farmer',
      'home.multilingualSupport': 'Multilingual Support',
      'home.multilingualDesc': 'Available in Hindi, Marathi, Gujarati, English and other local languages',
      'home.voiceSupport': 'Voice Support',
      'home.voiceSupportDesc': 'Ask questions by speaking and listen to answers in voice. No problem if you can\'t read or write',
      'home.askVoice': 'Ask in Voice',
      'home.startSmartFarming': 'Start your smart farming today',
      'home.joinThousands': 'Thousands of farmer brothers are already using it. You also join.',
      'home.getAdviceNow': 'Get Advice Now',
      'home.giveOpinion': 'Give Your Opinion',
      
      // Common
      'common.start': 'Start',
      'common.registered_farmers': 'Registered Farmers',
      'common.satisfied_users': 'Satisfied Users',
      'common.states_served': 'States Served',
      
      // Feedback page
      'feedback.title': 'Your Opinion',
      'feedback.subtitle': 'Share your opinion to improve our service',
      'feedback.form': 'Feedback Form',
      'feedback.name': 'Name',
      'feedback.phone': 'Mobile Number',
      'feedback.location': 'Location',
      'feedback.category': 'Feedback Category',
      'feedback.rating': 'Rating',
      'feedback.detailFeedback': 'Detailed Opinion',
      'feedback.send': 'Send',
      'feedback.speak': 'Speak',
      'feedback.stop': 'Stop',
      'feedback.recentOpinions': 'Recent Opinions',
      'feedback.contactUs': 'Contact Us',
      'feedback.phone_label': 'Phone',
      'feedback.whatsapp': 'WhatsApp',
      'feedback.email': 'Email',
      'feedback.available24x7': '24/7 Available',
      'feedback.tollFree': 'Toll Free',
      'feedback.quickResponse': 'Quick Response',
    },
    hi: {
      // Navigation
      'nav.home': 'होम',
      'nav.advisory': 'सलाह',
      'nav.soil': 'मिट्टी',
      'nav.weather': 'मौसम',
      'nav.market': 'बाजार',
      'nav.pest': 'कीट',
      'nav.schemes': 'योजना',
      'nav.feedback': 'राय',
      
      // Home page
      'home.title': 'स्मार्ट कृषि सलाह सिस्टम',
      'home.subtitle': 'AI तकनीक से लैस, किसानों के लिए बनाया गया एक संपूर्ण समाधान',
      'home.description': 'फसल, मिट्टी, मौसम, बाजार - सब कुछ एक ही जगह। आसान भाषा में, आपकी सुविधा के अनुसार।',
      'home.startAdvice': 'सलाह शुरू करें',
      'home.downloadApp': 'ऐप डाउनलोड करें',
      'home.statsTitle': 'आपकी खेती के लिए सबकुछ',
      'home.statsSubtitle': 'आधुनिक तकनीक और पारंपरिक ज्ञान का मेल, हर किसान की सफलता के लिए',
      'home.feature.aiAdvisor': 'AI कृषि सलाहकार',
      'home.feature.aiAdvisorDesc': '24/7 उपलब्ध बुद्धिमान सलाहकार जो आपके सवालों का तुरंत जवाब देता है',
      'home.feature.soilAdvice': 'मिट्टी और खाद सलाह',
      'home.feature.soilAdviceDesc': 'अपनी मिट्टी की जांच करें और सही खाद की व्यक्तिगत सिफारिश पाएं',
      'home.feature.weatherForecast': 'मौसम पूर्वानुमान',
      'home.feature.weatherForecastDesc': 'सटीक मौसम की जानकारी और कृषि के लिए विशेष सुझाव',
      'home.feature.marketPrices': 'बाजार भाव',
      'home.feature.marketPricesDesc': 'वर्तमान मंडी दरें और भविष्य के रुझान की जानकारी',
      'home.feature.pestIdentification': 'कीट पहचान',
      'home.feature.pestIdentificationDesc': 'फोटो अपलोड करें और तुरंत कीट/रोग की पहचान और इलाज पाएं',
      'home.feature.govSchemes': 'सरकारी योजनाएं',
      'home.feature.govSchemesDesc': 'किसानों के लिए उपलब्ध सभी सरकारी योजनाओं की विस्तृत जानकारी',
      'home.easyForFarmers': 'हर किसान के लिए आसान',
      'home.multilingualSupport': 'बहुभाषी सपोर्ट',
      'home.multilingualDesc': 'हिंदी, मराठी, गुजराती, अंग्रेजी और अन्य स्थानीय भाषाओं में उपलब्ध',
      'home.voiceSupport': 'आवाज सहायता',
      'home.voiceSupportDesc': 'बोलकर सवाल पूछें और आवाज में जवाब सुनें। पढ़ना-लिखना न आए तो भी कोई समस्या नहीं',
      'home.askVoice': 'आवाज में पूछें',
      'home.startSmartFarming': 'आज ही शुरू करें अपनी स्मार्ट खेती',
      'home.joinThousands': 'हजारों किसान भाई पहले से ही उपयोग कर रहे हैं। आप भी जुड़िए।',
      'home.getAdviceNow': 'अभी सलाह लें',
      'home.giveOpinion': 'अपनी राय दें',
      
      // Common
      'common.start': 'शुरू करें',
      'common.registered_farmers': 'पंजीकृत किसान',
      'common.satisfied_users': 'संतुष्ट उपयोगकर्ता',
      'common.states_served': 'राज्यों में सेवा',
      
      // Feedback page
      'feedback.title': 'आपकी राय',
      'feedback.subtitle': 'हमारी सेवा को बेहतर बनाने के लिए अपनी राय दें',
      'feedback.form': 'फीडबैक फॉर्म',
      'feedback.name': 'नाम',
      'feedback.phone': 'मोबाइल नंबर',
      'feedback.location': 'स्थान',
      'feedback.category': 'फीडबैक श्रेणी',
      'feedback.rating': 'रेटिंग',
      'feedback.detailFeedback': 'विस्तृत राय',
      'feedback.send': 'भेजें',
      'feedback.speak': 'बोलें',
      'feedback.stop': 'रुकें',
      'feedback.recentOpinions': 'हाल की राय',
      'feedback.contactUs': 'हमसे संपर्क करें',
      'feedback.phone_label': 'फोन',
      'feedback.whatsapp': 'व्हाट्सऐप',
      'feedback.email': 'ईमेल',
      'feedback.available24x7': '24/7 उपलब्ध',
      'feedback.tollFree': 'टोल फ्री',
      'feedback.quickResponse': 'तुरंत जवाब',
    },
    pa: {
      // Navigation
      'nav.home': 'ਘਰ',
      'nav.advisory': 'ਸਲਾਹ',
      'nav.soil': 'ਮਿੱਟੀ',
      'nav.weather': 'ਮੌਸਮ',
      'nav.market': 'ਬਾਜ਼ਾਰ',
      'nav.pest': 'ਕੀੜੇ',
      'nav.schemes': 'ਯੋਜਨਾਵਾਂ',
      'nav.feedback': 'ਰਾਏ',
      
      // Home page
      'home.title': 'ਸਮਾਰਟ ਫਸਲ ਸਲਾਹ ਸਿਸਟਮ',
      'home.subtitle': 'AI ਤਕਨਾਲੋਜੀ ਨਾਲ ਲੈਸ, ਕਿਸਾਨਾਂ ਲਈ ਬਣਾਇਆ ਗਿਆ ਸੰਪੂਰਨ ਹੱਲ',
      'home.description': 'ਫਸਲ, ਮਿੱਟੀ, ਮੌਸਮ, ਬਾਜ਼ਾਰ - ਸਭ ਕੁਝ ਇੱਕ ਹੀ ਥਾਂ ਤੇ। ਸਰਲ ਭਾਸ਼ਾ ਵਿੱਚ, ਤੁਹਾਡੀ ਸਹੂਲਤ ਅਨੁਸਾਰ।',
      'home.startAdvice': 'ਸਲਾਹ ਸ਼ੁਰੂ ਕਰੋ',
      'home.downloadApp': 'ਐਪ ਡਾਊਨਲੋਡ ਕਰੋ',
      'home.statsTitle': 'ਤੁਹਾਡੀ ਖੇਤੀ ਲਈ ਸਭ ਕੁਝ',
      'home.statsSubtitle': 'ਆਧੁਨਿਕ ਤਕਨਾਲੋਜੀ ਅਤੇ ਪਰੰਪਰਾਗਤ ਗਿਆਨ ਦਾ ਮਿਸ਼ਰਣ, ਹਰ ਕਿਸਾਨ ਦੀ ਸਫਲਤਾ ਲਈ',
      'home.feature.aiAdvisor': 'AI ਖੇਤੀ ਸਲਾਹਕਾਰ',
      'home.feature.aiAdvisorDesc': '24/7 ਉਪਲਬਧ ਬੁਧੀਮਾਨ ਸਲਾਹਕਾਰ ਜੋ ਤੁਹਾਡੇ ਸਵਾਲਾਂ ਦਾ ਤੁਰੰਤ ਜਵਾਬ ਦਿੰਦਾ ਹੈ',
      'home.feature.soilAdvice': 'ਮਿੱਟੀ ਅਤੇ ਖਾਦ ਸਲਾਹ',
      'home.feature.soilAdviceDesc': 'ਆਪਣੀ ਮਿੱਟੀ ਦੀ ਜਾਂਚ ਕਰੋ ਅਤੇ ਸਹੀ ਖਾਦ ਦੀ ਵਿਅਕਤੀਗਤ ਸਿਫਾਰਸ਼ ਪਾਓ',
      'home.feature.weatherForecast': 'ਮੌਸਮ ਪੂਰਵ-ਅਨੁਮਾਨ',
      'home.feature.weatherForecastDesc': 'ਸਟੀਕ ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ ਅਤੇ ਖੇਤੀ ਲਈ ਖਾਸ ਸੁਝਾਅ',
      'home.feature.marketPrices': 'ਬਾਜ਼ਾਰ ਭਾਅ',
      'home.feature.marketPricesDesc': 'ਮੌਜੂਦਾ ਮੰਡੀ ਦਰਾਂ ਅਤੇ ਭਵਿੱਖ ਦੇ ਰੁਝਾਨਾਂ ਦੀ ਜਾਣਕਾਰੀ',
      'home.feature.pestIdentification': 'ਕੀੜੇ ਦੀ ਪਛਾਣ',
      'home.feature.pestIdentificationDesc': 'ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ ਅਤੇ ਤੁਰੰਤ ਕੀੜੇ/ਬੀਮਾਰੀ ਦੀ ਪਛਾਣ ਅਤੇ ਇਲਾਜ ਪਾਓ',
      'home.feature.govSchemes': 'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ',
      'home.feature.govSchemesDesc': 'ਕਿਸਾਨਾਂ ਲਈ ਉਪਲਬਧ ਸਾਰੀਆਂ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਦੀ ਵਿਸਤ੍ਰਿੱਤ ਜਾਣਕਾਰੀ',
      'home.easyForFarmers': 'ਹਰ ਕਿਸਾਨ ਲਈ ਆਸਾਨ',
      'home.multilingualSupport': 'ਬਹੁ-ਭਾਸ਼ਾਈ ਸਹਾਇਤਾ',
      'home.multilingualDesc': 'ਪੰਜਾਬੀ, ਹਿੰਦੀ, ਮਰਾਠੀ, ਅੰਗਰੇਜ਼ੀ ਅਤੇ ਹੋਰ ਸਥਾਨਕ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਉਪਲਬਧ',
      'home.voiceSupport': 'ਆਵਾਜ਼ ਸਹਾਇਤਾ',
      'home.voiceSupportDesc': 'ਬੋਲ ਕੇ ਸਵਾਲ ਪੁੱਛੋ ਅਤੇ ਆਵਾਜ਼ ਵਿੱਚ ਜਵਾਬ ਸੁਣੋ। ਪੜ੍ਹਨਾ-ਲਿਖਣਾ ਨਾ ਆਵੇ ਤਾਂ ਵੀ ਕੋਈ ਸਮੱਸਿਆ ਨਹੀਂ',
      'home.askVoice': 'ਆਵਾਜ਼ ਵਿੱਚ ਪੁੱਛੋ',
      'home.startSmartFarming': 'ਅੱਜ ਹੀ ਸ਼ੁਰੂ ਕਰੋ ਆਪਣੀ ਸਮਾਰਟ ਖੇਤੀ',
      'home.joinThousands': 'ਹਜ਼ਾਰਾਂ ਕਿਸਾਨ ਭਰਾ ਪਹਿਲਾਂ ਤੋਂ ਹੀ ਵਰਤ ਰਹੇ ਹਨ। ਤੁਸੀਂ ਵੀ ਜੁੜੋ।',
      'home.getAdviceNow': 'ਹੁਣੇ ਸਲਾਹ ਲਓ',
      'home.giveOpinion': 'ਆਪਣੀ ਰਾਏ ਦਿਓ',
      
      // Common
      'common.start': 'ਸ਼ੁਰੂ ਕਰੋ',
      'common.registered_farmers': 'ਰਜਿਸਟਰਡ ਕਿਸਾਨ',
      'common.satisfied_users': 'ਸੰਤੁਸ਼ਟ ਉਪਭੋਗਤਾ',
      'common.states_served': 'ਰਾਜਾਂ ਵਿੱਚ ਸੇਵਾ',
      
      // Feedback page
      'feedback.title': 'ਤੁਹਾਡੀ ਰਾਏ',
      'feedback.subtitle': 'ਸਾਡੀ ਸੇਵਾ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਣ ਲਈ ਆਪਣੀ ਰਾਏ ਦਿਓ',
      'feedback.form': 'ਫੀਡਬੈਕ ਫਾਰਮ',
      'feedback.name': 'ਨਾਮ',
      'feedback.phone': 'ਮੋਬਾਈਲ ਨੰਬਰ',
      'feedback.location': 'ਸਥਾਨ',
      'feedback.category': 'ਫੀਡਬੈਕ ਸ਼੍ਰੇਣੀ',
      'feedback.rating': 'ਰੇਟਿੰਗ',
      'feedback.detailFeedback': 'ਵਿਸਤ੍ਰਿੱਤ ਰਾਏ',
      'feedback.send': 'ਭੇਜੋ',
      'feedback.speak': 'ਬੋਲੋ',
      'feedback.stop': 'ਰੁਕੋ',
      'feedback.recentOpinions': 'ਹਾਲ ਦੀਆਂ ਰਾਵਾਂ',
      'feedback.contactUs': 'ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
      'feedback.phone_label': 'ਫੋਨ',
      'feedback.whatsapp': 'ਵਟਸਐਪ',
      'feedback.email': 'ਈਮੇਲ',
      'feedback.available24x7': '24/7 ਉਪਲਬਧ',
      'feedback.tollFree': 'ਟੋਲ ਫ੍ਰੀ',
      'feedback.quickResponse': 'ਤੁਰੰਤ ਜਵਾਬ',
    }
  };

  return translations[language] || translations.hi;
};