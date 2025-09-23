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
              <div className="bg-white rounded-2xl shadow-lg overflow