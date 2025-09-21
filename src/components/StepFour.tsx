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
        <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
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
                  ? 'scale-[1.02] shadow-2xl ring-2 ring-blue-500' 
                  : 'hover:scale-[1.01] hover:shadow-xl'
              }`}
              onClick={() => toggleCampaign(campaign.id)}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'slideUp 0.6s ease-out forwards'
              }}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent hover:border-blue-200 transition-all duration-200">
                {/* Badge */}
                {campaign.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>{campaign.badge}</span>
                    </div>
                  </div>
                )}

                {/* Selection Indicator */}
                <div className="absolute top-4 right-4 z-10">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-white bg-white/80 backdrop-blur-sm'
                  }`}>
                    {isSelected && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>

                {/* Campaign Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 ${campaign.bgColor} opacity-90`}></div>
                  <img 
                    src={campaign.imageUrl} 
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {campaign.title}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {campaign.subtitle}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {campaign.originalPrice && (
                        <span className="text-slate-400 line-through text-sm">
                          {campaign.originalPrice}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-slate-900">
                        {campaign.discountedPrice}
                      </span>
                      <span className="text-slate-600 text-sm">/ay</span>
                    </div>
                    {campaign.originalPrice && (
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        İndirimli
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {campaign.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900 text-sm">Özellikler:</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {campaign.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                          <span className="text-slate-600 text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selection Overlay */}
                {isSelected && (
                  <div className="absolute inset-0 bg-blue-500/10 rounded-2xl pointer-events-none"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Campaigns Summary */}
      {selectedCampaigns.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 animate-slideUp">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900 mb-2">
                Seçilen Kampanyalar ({selectedCampaigns.length})
              </h4>
              <div className="space-y-1">
                {selectedCampaigns.map(campaignId => {
                  const campaign = campaigns.find(c => c.id === campaignId);
                  return campaign ? (
                    <div key={campaignId} className="flex items-center justify-between text-sm">
                      <span className="text-blue-800">{campaign.title}</span>
                      <span className="font-semibold text-blue-900">{campaign.discountedPrice}/ay</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-amber-900 mb-1">Kampanya Bilgisi</h4>
            <p className="text-amber-800 text-sm leading-relaxed">
              Birden fazla kampanya seçebilirsiniz. Seçtiğiniz kampanyalar bir sonraki adımda 
              detaylandırılacak ve toplam fiyatlandırma gösterilecektir.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-6 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Geri</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!isValid}
          className={`
            flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200
            ${isValid
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }
          `}
        >
          <span>Devam Et ({selectedCampaigns.length})</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default StepFour;