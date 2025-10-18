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
      
      // Chat page
      'chat.title': 'Agricultural Advisory Chat',
      'chat.subtitle': 'Ask your farming questions and get instant answers',
      'chat.aiAssistant': 'AI Agricultural Assistant',
      'chat.placeholder': 'Type your question here...',
      'chat.suggestedQuestions': 'Suggested Questions:',
      'chat.languageSupport': 'Language Support:',
      'chat.welcomeMessage': 'Hello! I am your agricultural advisor. I can answer questions about crops, soil, and fertilizers.',
      'chat.botThinking': 'Thank you for your question. I am trying to help you...',

      // Soil page
      'soil.title': 'Soil and Fertilizer Advice',
      'soil.subtitle': 'Test your soil and get the right fertilizer advice',
      'soil.testForm': 'Soil Test Form',
      'soil.location': 'Farm Location',
      'soil.soilType': 'Soil Type',
      'soil.selectSoilType': 'Select Soil Type',
      'soil.previousCrop': 'Previous Crop',
      'soil.selectPreviousCrop': 'Select Previous Crop',
      'soil.nextCrop': 'Next Crop',
      'soil.selectNextCrop': 'Select Next Crop',
      'soil.area': 'Farm Area (Acres)',
      'soil.issues': 'Issues (if any)',
      'soil.issuesPlaceholder': 'Write any crop issues you see...',
      'soil.getAdvice': 'Get Advice',
      'soil.recommendation': 'Fertilizer Recommendation',
      'soil.soilTypeLabel': 'Soil Type:',
      'soil.npkRatio': 'NPK Ratio:',
      'soil.organicFertilizer': 'Organic Fertilizer:',
      'soil.additives': 'Additional Materials:',
      'soil.downloadAdvice': 'Download Advice',

      // Weather page
      'weather.title': 'Weather Advice',
      'weather.subtitle': 'Current weather and agricultural advice',
      'weather.currentWeather': 'Current Weather',
      'weather.temperature': 'Temperature',
      'weather.humidity': 'Humidity',
      'weather.wind': 'Wind',
      'weather.condition': 'Condition',
      'weather.weatherWarning': 'Weather Warning',
      'weather.agriculturalSuggestions': 'Agricultural Suggestions',
      'weather.irrigationAdvice': 'Irrigation Advice',
      'weather.soilMoisture': 'Soil Moisture: Good',
      'weather.irrigationNotNeeded': 'No irrigation needed for next 3 days',
      'weather.setIrrigationReminder': 'Set Irrigation Reminder',

      // Market page
      'market.title': 'Market Prices',
      'market.subtitle': 'Today\'s market rates and trends',
      'market.marketAnalysis': 'Market Analysis',
      'market.weeklyTrend': 'Weekly Trend',
      'market.todaysBest': 'Today\'s Best:',
      'market.sellingSuggestion': 'Selling Suggestion:',
      'market.buyingSuggestion': 'Buying Suggestion:',
      'market.detailedReport': 'View Detailed Report',

      // Pest page
      'pest.title': 'Pest and Disease Identification',
      'pest.subtitle': 'Upload crop photo and get instant solution',
      'pest.uploadPhoto': 'Upload Photo',
      'pest.uploadNewPhoto': 'Upload New Photo',
      'pest.uploadInstructions': 'JPG, PNG or JPEG format (up to 5MB)',
      'pest.chooseFile': 'Choose File',
      'pest.betterResults': 'For better results:',
      'pest.analysisResult': 'Analysis Result',
      'pest.identification': 'Identification:',
      'pest.confidence': 'Confidence',
      'pest.severity': 'Severity:',
      'pest.treatment': 'Treatment:',
      'pest.prevention': 'Prevention:',
      'pest.saveAdvice': 'Save Advice',
      'pest.commonPests': 'Common Pests and Diseases',

      // Schemes page
      'schemes.title': 'Government Schemes',
      'schemes.subtitle': 'Information about government schemes available for farmers',
      'schemes.totalSchemes': 'Total Schemes',
      'schemes.activeSchemes': 'Active Schemes',
      'schemes.favorites': 'Favorites',
      'schemes.description': 'Description:',
      'schemes.benefitAmount': 'Benefit Amount:',
      'schemes.deadline': 'Deadline:',
      'schemes.eligibility': 'Eligibility:',
      'schemes.requiredDocuments': 'Required Documents:',
      'schemes.apply': 'Apply',
      'schemes.viewDetails': 'View Details',
      'schemes.updateAlert': 'Update Alert',
      'schemes.enableAlert': 'Enable Alert',

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
      
      // Chat page
      'chat.title': 'कृषि सलाहकार चैट',
      'chat.subtitle': 'अपनी खेती के सवाल पूछें और तुरंत जवाब पाएं',
      'chat.aiAssistant': 'AI कृषि सहायक',
      'chat.placeholder': 'अपना सवाल यहां लिखें...',
      'chat.suggestedQuestions': 'सुझाए गए सवाल:',
      'chat.languageSupport': 'भाषा सहायता:',
      'chat.welcomeMessage': 'नमस्ते! मैं आपका कृषि सलाहकार हूं। मैं फसल, मिट्टी, और खाद के बारे में सवालों का जवाब दे सकता हूं।',
      'chat.botThinking': 'धन्यवाद आपके सवाल के लिए। मैं आपकी मदद करने की कोशिश कर रहा हूं...',

      // Soil page
      'soil.title': 'मिट्टी और खाद सलाह',
      'soil.subtitle': 'अपनी मिट्टी की जांच करें और सही खाद की सलाह पाएं',
      'soil.testForm': 'मिट्टी परीक्षण फॉर्म',
      'soil.location': 'खेत का स्थान',
      'soil.soilType': 'मिट्टी का प्रकार',
      'soil.selectSoilType': 'मिट्टी का प्रकार चुनें',
      'soil.previousCrop': 'पिछली फसल',
      'soil.selectPreviousCrop': 'पिछली फसल चुनें',
      'soil.nextCrop': 'अगली फसल',
      'soil.selectNextCrop': 'बोने वाली फसल चुनें',
      'soil.area': 'खेत का क्षेत्रफल (एकड़)',
      'soil.issues': 'समस्याएं (यदि कोई हो)',
      'soil.issuesPlaceholder': 'फसल में दिखने वाली समस्याएं लिखें...',
      'soil.getAdvice': 'सलाह प्राप्त करें',
      'soil.recommendation': 'खाद की सिफारिश',
      'soil.soilTypeLabel': 'मिट्टी का प्रकार:',
      'soil.npkRatio': 'NPK अनुपात:',
      'soil.organicFertilizer': 'जैविक खाद:',
      'soil.additives': 'अतिरिक्त सामग्री:',
      'soil.downloadAdvice': 'सलाह डाउनलोड करें',

      // Weather page
      'weather.title': 'मौसम सलाह',
      'weather.subtitle': 'वर्तमान मौसम और कृषि सलाह',
      'weather.currentWeather': 'वर्तमान मौसम',
      'weather.temperature': 'तापमान',
      'weather.humidity': 'नमी',
      'weather.wind': 'हवा',
      'weather.condition': 'स्थिति',
      'weather.weatherWarning': 'मौसम चेतावनी',
      'weather.agriculturalSuggestions': 'कृषि सुझाव',
      'weather.irrigationAdvice': 'सिंचाई सलाह',
      'weather.soilMoisture': 'मिट्टी की नमी: अच्छी',
      'weather.irrigationNotNeeded': 'अगले 3 दिन सिंचाई की जरूरत नहीं',
      'weather.setIrrigationReminder': 'सिंचाई रिमाइंडर सेट करें',

      // Market page
      'market.title': 'मंडी भाव',
      'market.subtitle': 'आज के बाजार दर और रुझान',
      'market.marketAnalysis': 'बाजार विश्लेषण',
      'market.weeklyTrend': 'सप्ताह का रुझान',
      'market.todaysBest': 'आज का सर्वोत्तम:',
      'market.sellingSuggestion': 'बेचने का सुझाव:',
      'market.buyingSuggestion': 'खरीदने का सुझाव:',
      'market.detailedReport': 'विस्तृत रिपोर्ट देखें',

      // Pest page
      'pest.title': 'कीट और रोग पहचान',
      'pest.subtitle': 'फसल की तस्वीर अपलोड करें और तुरंत समाधान पाएं',
      'pest.uploadPhoto': 'तस्वीर अपलोड करें',
      'pest.uploadNewPhoto': 'नई तस्वीर अपलोड करें',
      'pest.uploadInstructions': 'JPG, PNG या JPEG फॉर्मेट में (5MB तक)',
      'pest.chooseFile': 'फ़ाइल चुनें',
      'pest.betterResults': 'बेहतर परिणाम के लिए:',
      'pest.analysisResult': 'विश्लेषण परिणाम',
      'pest.identification': 'पहचान:',
      'pest.confidence': 'विश्वसनीयता',
      'pest.severity': 'गंभीरता:',
      'pest.treatment': 'उपचार:',
      'pest.prevention': 'रोकथाम:',
      'pest.saveAdvice': 'सलाह सेव करें',
      'pest.commonPests': 'सामान्य कीट और रोग',

      // Schemes page
      'schemes.title': 'सरकारी योजनाएं',
      'schemes.subtitle': 'किसानों के लिए उपलब्ध सरकारी योजनाओं की जानकारी',
      'schemes.totalSchemes': 'कुल योजनाएं',
      'schemes.activeSchemes': 'सक्रिय योजनाएं',
      'schemes.favorites': 'पसंदीदा',
      'schemes.description': 'विवरण:',
      'schemes.benefitAmount': 'लाभ राशि:',
      'schemes.deadline': 'अंतिम तिथि:',
      'schemes.eligibility': 'पात्रता:',
      'schemes.requiredDocuments': 'आवश्यक दस्तावेज:',
      'schemes.apply': 'आवेदन करें',
      'schemes.viewDetails': 'विस्तार देखें',
      'schemes.updateAlert': 'अपडेट अलर्ट',
      'schemes.enableAlert': 'अलर्ट सक्रिय करें',

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
      
      // Chat page
      'chat.title': 'ਖੇਤੀ ਸਲਾਹਕਾਰ ਚੈਟ',
      'chat.subtitle': 'ਆਪਣੇ ਖੇਤੀ ਦੇ ਸਵਾਲ ਪੁੱਛੋ ਅਤੇ ਤੁਰੰਤ ਜਵਾਬ ਪਾਓ',
      'chat.aiAssistant': 'AI ਖੇਤੀ ਸਹਾਇਕ',
      'chat.placeholder': 'ਆਪਣਾ ਸਵਾਲ ਇੱਥੇ ਲਿਖੋ...',
      'chat.suggestedQuestions': 'ਸੁਝਾਏ ਗਏ ਸਵਾਲ:',
      'chat.languageSupport': 'ਭਾਸ਼ਾ ਸਹਾਇਤਾ:',
      'chat.welcomeMessage': 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਖੇਤੀ ਸਲਾਹਕਾਰ ਹਾਂ। ਮੈਂ ਫਸਲ, ਮਿੱਟੀ, ਅਤੇ ਖਾਦ ਬਾਰੇ ਸਵਾਲਾਂ ਦਾ ਜਵਾਬ ਦੇ ਸਕਦਾ ਹਾਂ।',
      'chat.botThinking': 'ਤੁਹਾਡੇ ਸਵਾਲ ਲਈ ਧੰਨਵਾਦ। ਮੈਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰ ਰਿਹਾ ਹਾਂ...',

      // Soil page
      'soil.title': 'ਮਿੱਟੀ ਅਤੇ ਖਾਦ ਸਲਾਹ',
      'soil.subtitle': 'ਆਪਣੀ ਮਿੱਟੀ ਦੀ ਜਾਂਚ ਕਰੋ ਅਤੇ ਸਹੀ ਖਾਦ ਦੀ ਸਲਾਹ ਪਾਓ',
      'soil.testForm': 'ਮਿੱਟੀ ਜਾਂਚ ਫਾਰਮ',
      'soil.location': 'ਖੇਤ ਦਾ ਸਥਾਨ',
      'soil.soilType': 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ',
      'soil.selectSoilType': 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਚੁਣੋ',
      'soil.previousCrop': 'ਪਿਛਲੀ ਫਸਲ',
      'soil.selectPreviousCrop': 'ਪਿਛਲੀ ਫਸਲ ਚੁਣੋ',
      'soil.nextCrop': 'ਅਗਲੀ ਫਸਲ',
      'soil.selectNextCrop': 'ਬੀਜਣ ਵਾਲੀ ਫਸਲ ਚੁਣੋ',
      'soil.area': 'ਖੇਤ ਦਾ ਖੇਤਰਫਲ (ਏਕੜ)',
      'soil.issues': 'ਸਮੱਸਿਆਵਾਂ (ਜੇ ਕੋਈ ਹੋਵੇ)',
      'soil.issuesPlaceholder': 'ਫਸਲ ਵਿੱਚ ਦਿਖਾਈ ਦੇਣ ਵਾਲੀਆਂ ਸਮੱਸਿਆਵਾਂ ਲਿਖੋ...',
      'soil.getAdvice': 'ਸਲਾਹ ਪ੍ਰਾਪਤ ਕਰੋ',
      'soil.recommendation': 'ਖਾਦ ਦੀ ਸਿਫਾਰਸ਼',
      'soil.soilTypeLabel': 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ:',
      'soil.npkRatio': 'NPK ਅਨੁਪਾਤ:',
      'soil.organicFertilizer': 'ਜੈਵਿਕ ਖਾਦ:',
      'soil.additives': 'ਵਾਧੂ ਸਮੱਗਰੀ:',
      'soil.downloadAdvice': 'ਸਲਾਹ ਡਾਊਨਲੋਡ ਕਰੋ',

      // Weather page
      'weather.title': 'ਮੌਸਮ ਸਲਾਹ',
      'weather.subtitle': 'ਮੌਜੂਦਾ ਮੌਸਮ ਅਤੇ ਖੇਤੀ ਸਲਾਹ',
      'weather.currentWeather': 'ਮੌਜੂਦਾ ਮੌਸਮ',
      'weather.temperature': 'ਤਾਪਮਾਨ',
      'weather.humidity': 'ਨਮੀ',
      'weather.wind': 'ਹਵਾ',
      'weather.condition': 'ਸਥਿਤੀ',
      'weather.weatherWarning': 'ਮੌਸਮ ਚੇਤਾਵਨੀ',
      'weather.agriculturalSuggestions': 'ਖੇਤੀ ਸੁਝਾਅ',
      'weather.irrigationAdvice': 'ਸਿੰਚਾਈ ਸਲਾਹ',
      'weather.soilMoisture': 'ਮਿੱਟੀ ਦੀ ਨਮੀ: ਚੰਗੀ',
      'weather.irrigationNotNeeded': 'ਅਗਲੇ 3 ਦਿਨ ਸਿੰਚਾਈ ਦੀ ਲੋੜ ਨਹੀਂ',
      'weather.setIrrigationReminder': 'ਸਿੰਚਾਈ ਰਿਮਾਈਂਡਰ ਸੈੱਟ ਕਰੋ',

      // Market page
      'market.title': 'ਬਾਜ਼ਾਰ ਭਾਅ',
      'market.subtitle': 'ਅੱਜ ਦੇ ਬਾਜ਼ਾਰ ਦਰ ਅਤੇ ਰੁਝਾਨ',
      'market.marketAnalysis': 'ਬਾਜ਼ਾਰ ਵਿਸ਼ਲੇਸ਼ਣ',
      'market.weeklyTrend': 'ਸਪਤਾਹਿਕ ਰੁਝਾਨ',
      'market.todaysBest': 'ਅੱਜ ਦਾ ਸਰਵੋਤਮ:',
      'market.sellingSuggestion': 'ਵੇਚਣ ਦਾ ਸੁਝਾਅ:',
      'market.buyingSuggestion': 'ਖਰੀਦਣ ਦਾ ਸੁਝਾਅ:',
      'market.detailedReport': 'ਵਿਸਤ੍ਰਿਤ ਰਿਪੋਰਟ ਦੇਖੋ',

      // Pest page
      'pest.title': 'ਕੀੜੇ ਅਤੇ ਬੀਮਾਰੀ ਦੀ ਪਛਾਣ',
      'pest.subtitle': 'ਫਸਲ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ ਅਤੇ ਤੁਰੰਤ ਹੱਲ ਪਾਓ',
      'pest.uploadPhoto': 'ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ',
      'pest.uploadNewPhoto': 'ਨਵੀਂ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ',
      'pest.uploadInstructions': 'JPG, PNG ਜਾਂ JPEG ਫਾਰਮੈਟ ਵਿੱਚ (5MB ਤੱਕ)',
      'pest.chooseFile': 'ਫਾਈਲ ਚੁਣੋ',
      'pest.betterResults': 'ਬਿਹਤਰ ਨਤੀਜਿਆਂ ਲਈ:',
      'pest.analysisResult': 'ਵਿਸ਼ਲੇਸ਼ਣ ਨਤੀਜਾ',
      'pest.identification': 'ਪਛਾਣ:',
      'pest.confidence': 'ਭਰੋਸਾ',
      'pest.severity': 'ਗੰਭੀਰਤਾ:',
      'pest.treatment': 'ਇਲਾਜ:',
      'pest.prevention': 'ਰੋਕਥਾਮ:',
      'pest.saveAdvice': 'ਸਲਾਹ ਸੇਵ ਕਰੋ',
      'pest.commonPests': 'ਆਮ ਕੀੜੇ ਅਤੇ ਬੀਮਾਰੀਆਂ',

      // Schemes page
      'schemes.title': 'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ',
      'schemes.subtitle': 'ਕਿਸਾਨਾਂ ਲਈ ਉਪਲਬਧ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਦੀ ਜਾਣਕਾਰੀ',
      'schemes.totalSchemes': 'ਕੁੱਲ ਯੋਜਨਾਵਾਂ',
      'schemes.activeSchemes': 'ਸਰਗਰਮ ਯੋਜਨਾਵਾਂ',
      'schemes.favorites': 'ਪਸੰਦੀਦਾ',
      'schemes.description': 'ਵੇਰਵਾ:',
      'schemes.benefitAmount': 'ਲਾਭ ਰਾਸ਼ੀ:',
      'schemes.deadline': 'ਅੰਤਮ ਮਿਤੀ:',
      'schemes.eligibility': 'ਯੋਗਤਾ:',
      'schemes.requiredDocuments': 'ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼:',
      'schemes.apply': 'ਅਰਜ਼ੀ ਦਿਓ',
      'schemes.viewDetails': 'ਵੇਰਵਾ ਵੇਖੋ',
      'schemes.updateAlert': 'ਅਪਡੇਟ ਅਲਰਟ',
      'schemes.enableAlert': 'ਅਲਰਟ ਸਰਗਰਮ ਕਰੋ',

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