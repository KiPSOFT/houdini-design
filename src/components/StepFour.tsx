import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Gift, Star, Check, Zap, Phone, Users, MessageCircle } from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  badge?: string;
  color: string;
  bgColor: string;
  imageUrl: string;
  originalPrice?: string;
  discountedPrice: string;
}

interface StepFourProps {
  onNext: (data: { selectedCampaigns: string[] }) => void;
  onBack: () => void;
}

const StepFour: React.FC<StepFourProps> = ({ onNext, onBack }) => {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);

  const campaigns: Campaign[] = [
    {
      id: 'welcome-campaign',
      title: 'Hoş Geldin Kampanyası',
      subtitle: 'Ekonomik Paket + 100 DK',
      description: '2 Dahili 1 Dış Hat 815₺ yerine 495₺ sadece ilk ay için geçerli. Ücretsiz kurulum dahil.',
      features: [
        '2 Dahili Hat',
        '1 Dış Hat', 
        '100 Dakika Hediye',
        'Ücretsiz Kurulum',
        'İlk Ay %40 İndirim'
      ],
      badge: 'Popüler',
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      imageUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      originalPrice: '815₺',
      discountedPrice: '495₺'
    },
    {
      id: 'business-pro',
      title: 'Business Pro Kampanyası',
      subtitle: 'Profesyonel Paket',
      description: '5 Dahili 3 Dış Hat ile profesyonel iletişim çözümü. WhatsApp Business entegrasyonu dahil.',
      features: [
        '5 Dahili Hat',
        '3 Dış Hat',
        'WhatsApp Business',
        'Sesli Yanıt Sistemi',
        '24/7 Teknik Destek'
      ],
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-500 to-pink-600',
      imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      discountedPrice: '1.250₺'
    },
    {
      id: 'startup-special',
      title: 'Startup Özel Kampanyası',
      subtitle: 'Girişimciler İçin',
      description: 'Yeni başlayan işletmeler için özel fiyatlarla tam donanımlı santral sistemi.',
      features: [
        '3 Dahili Hat',
        '2 Dış Hat',
        'Mobil Uygulama',
        'Çağrı Kayıt Sistemi',
        '6 Ay Ücretsiz SMS'
      ],
      badge: 'Yeni',
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-500 to-emerald-600',
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      originalPrice: '950₺',
      discountedPrice: '650₺'
    }
  ];

  const toggleCampaign = (campaignId: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(campaignId)
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const handleNext = () => {
    if (selectedCampaigns.length > 0) {
      onNext({ selectedCampaigns });
    }
  };

  const isValid = selectedCampaigns.length > 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-orange-100 text-orange-800 rounded-full text-sm font-medium">
          <Gift className="w-4 h-4 mr-2" />
          Kampanyalar
        </div>
        
        <h2 className="text-3xl font-bold text-slate-900">
          Uygun kampanyayı seçin
        </h2>
        <p className="text-lg text-slate-600">
          Size uygun kampanyaları seçerek daha fazla tasarruf edin
        </p>
      </div>

      {/* Campaigns Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign, index) => {
          const isSelected = selectedCampaigns.includes(campaign.id);
          
          return (
            <div
              key={campaign.id}
              className={`relative cursor-pointer transition-all duration-300 transform ${
                isSelected 
                  ? 'scale-[1.02] shadow-2xl ring-2 ring-pink-500' 
                  : 'hover:scale-[1.01] hover:shadow-xl'
              }`}
              onClick={() => toggleCampaign(campaign.id)}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'slideUp 0.6s ease-out forwards'
              }}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Campaign Badge */}
                {campaign.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500 to-orange-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      {campaign.badge}
                    </span>
                  </div>
                )}

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                {/* Campaign Image */}
                <div className={`h-48 ${campaign.bgColor} relative overflow-hidden`}>
                  <img 
                    src={campaign.imageUrl} 
                    alt={campaign.title}
                    className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Campaign Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {campaign.title}
                    </h3>
                    <p className={`text-sm font-medium ${campaign.color} mb-2`}>
                      {campaign.subtitle}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {campaign.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {campaign.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center space-x-2">
                      {campaign.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">
                          {campaign.originalPrice}
                        </span>
                      )}
                      <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        {campaign.discountedPrice}
                      </span>
                      <span className="text-sm text-slate-500">/ay</span>
                    </div>
                    
                    <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
                      isSelected 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-pink-500' 
                        : 'border-slate-300 hover:border-pink-400'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-white m-0.5" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Campaigns Summary */}
      {selectedCampaigns.length > 0 && (
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Seçilen Kampanyalar ({selectedCampaigns.length})
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {selectedCampaigns.map(campaignId => {
              const campaign = campaigns.find(c => c.id === campaignId);
              return campaign ? (
                <div key={campaignId} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{campaign.title}</p>
                    <p className="text-xs text-slate-500">{campaign.subtitle}</p>
                  </div>
                  <span className="text-sm font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {campaign.discountedPrice}
                  </span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8">
        <button
          onClick={onBack}
          className="flex items-center px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Geri
        </button>
        
        <button
          onClick={handleNext}
          disabled={!isValid}
          className={`flex items-center px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
            isValid
              ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {selectedCampaigns.length > 0 ? `Devam Et (${selectedCampaigns.length} Kampanya)` : 'Kampanya Seçin'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default StepFour;