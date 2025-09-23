import React, { useState } from 'react';
import { Phone, MessageCircle, Radio, MessageSquare, User, ArrowRight, Sparkles } from 'lucide-react';
import WizardStepper from './WizardStepper';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

interface ServiceOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

interface WizardData {
  selectedService?: string;
  externalLines?: number;
  internalLines?: number;
  paymentPlan?: string;
  selectedCampaigns?: string[];
}

const SalesWizard: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [wizardData, setWizardData] = useState<WizardData>({});

  const wizardSteps = [
    {
      id: 'start',
      title: 'Başlayalım',
      description: 'Ne yapmak istersiniz?'
    },
    {
      id: 'customize',
      title: 'Size Özel',
      description: 'Size özel ihtiyaçlarınızı belirleyelim'
    },
    {
      id: 'payment',
      title: 'Ödeme Planı',
      description: 'Ödeme planınızı seçin'
    },
    {
      id: 'campaigns',
      title: 'Kampanyalar',
      description: 'Size uygun kampanyalar'
    },
    {
      id: 'products',
      title: 'Ürünler',
      description: 'Seçtiğiniz ürünler'
    },
    {
      id: 'application',
      title: 'Başvuru',
      description: 'Başvuru bilgileri'
    },
    {
      id: 'payment-method',
      title: 'Ödeme',
      description: 'Ödemeyi tamamlayın'
    },
    {
      id: 'confirmation',
      title: 'E-Devlet',
      description: 'E-Devlet onayı'
    }
  ];

  const serviceOptions: ServiceOption[] = [
    {
      id: 'virtual-pbx',
      title: 'Sanal Santral Kullanmak İstiyorum',
      description: 'Profesyonel telefon sistemini hemen kullanmaya başlayın',
      icon: <Phone className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'whatsapp-business',
      title: 'WhatsApp Business Numara İstiyorum',
      description: 'WhatsApp Business için özel numara alın',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'own-pbx',
      title: 'Kendi Santralimde Numara Kullanmak İstiyorum',
      description: 'Mevcut santral sistemize numara entegrasyonu',
      icon: <Radio className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      id: 'sms',
      title: 'SMS Göndermek İstiyorum',
      description: 'Toplu SMS hizmeti ile müşterilerinize ulaşın',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
    }
  ];

  const handleContinue = () => {
    if (selectedOption) {
      setWizardData({ ...wizardData, selectedService: selectedOption });
      setCompletedSteps([1]);
      setCurrentStep(2);
    }
  };

  const handleStepTwoNext = (data: { externalLines: number; internalLines: number }) => {
    setWizardData({ ...wizardData, ...data });
    setCompletedSteps([1, 2]);
    setCurrentStep(3);
  };

  const handleStepTwoBack = () => {
    setCurrentStep(1);
    setCompletedSteps([]);
  };

  const handleStepThreeNext = (data: { paymentPlan: string }) => {
    setWizardData({ ...wizardData, ...data });
    setCompletedSteps([1, 2, 3]);
    setCurrentStep(4);
  };

  const handleStepThreeBack = () => {
    setCurrentStep(2);
    setCompletedSteps([1]);
  };

  const handleStepFourNext = (data: { selectedCampaigns: string[] }) => {
    setWizardData({ ...wizardData, ...data });
    setCompletedSteps([1, 2, 3, 4]);
    setCurrentStep(5);
  };

  const handleStepFourBack = () => {
    setCurrentStep(3);
    setCompletedSteps([1, 2]);
  };

  const handleStepFiveNext = (data: { selectedProducts: any[] }) => {
    setWizardData({ ...wizardData, ...data });
    setCompletedSteps([1, 2, 3, 4, 5]);
    setCurrentStep(6);
  };

  const handleStepFiveBack = () => {
    setCurrentStep(4);
    setCompletedSteps([1, 2, 3]);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-primary-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-800">Sanal Santral Houdini</span>
              <User className="w-4 h-4" />
              <span>Giriş Yap</span>
            </button>
          </div>
        </div>
      </header>

      {/* Wizard Stepper - Only show after first step */}
      {currentStep > 1 && (
        <WizardStepper 
          steps={wizardSteps} 
          currentStep={currentStep} 
          completedSteps={completedSteps} 
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentStep === 1 && (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center lg:text-left space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Başlayalım
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Ne yapmak 
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent"> istiyorsunuz?</span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                Size en uygun hizmeti bulmanız için lütfen ihtiyacınızı seçin
              </p>
            </div>

            {/* Service Options */}
            <div className="space-y-4">
              {serviceOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={`relative cursor-pointer transition-all duration-300 transform ${
                    selectedOption === option.id 
                      ? 'scale-[1.02] shadow-lg ring-2 ring-pink-500' 
                      : isHovering === option.id ? 'scale-[1.01] shadow-md' : 'hover:shadow-sm'
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                  onMouseEnter={() => setIsHovering(option.id)}
                  onMouseLeave={() => setIsHovering(null)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideUp 0.6s ease-out forwards'
                  }}
                >
                  <div className={`p-6 rounded-xl border-2 ${option.bgColor} ${selectedOption === option.id ? 'border-blue-500' : ''} transition-all duration-200`}>
                  <div className={`p-6 rounded-xl border-2 ${option.bgColor} ${selectedOption === option.id ? 'border-pink-500' : ''} transition-all duration-200`}>
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 p-3 rounded-lg ${option.color} bg-white shadow-sm`}>
                        {option.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">
                          {option.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                      <div className={`flex-shrink-0 transition-all duration-200 ${
                        selectedOption === option.id ? 'scale-110 text-pink-600' : 'text-slate-400'
                      }`}>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                    
                    {/* Selection indicator */}
                    {selectedOption === option.id && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Button */}
            {selectedOption && (
              <div className="animate-slideUp">
                <button
                  onClick={handleContinue}
                  className="w-full sm:w-auto bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Devam Et</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-3xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-orange-200/30 rounded-3xl transform -rotate-3"></div>
              
              {/* Main illustration container */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                <div className="text-center space-y-6">
                  {/* Character illustration placeholder */}
                  <div className="w-64 h-64 mx-auto bg-gradient-to-br from-pink-400 via-purple-400 to-orange-400 rounded-full flex items-center justify-center shadow-2xl">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                      <User className="w-16 h-16 text-slate-600" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-800">Size Yardımcı Olalım</h3>
                    <p className="text-slate-600">İhtiyacınıza en uygun çözümü bulalım</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {currentStep === 2 && (
          <StepTwo 
            onNext={handleStepTwoNext}
            onBack={handleStepTwoBack}
          />
        )}

        {currentStep === 3 && (
          <StepThree 
            onNext={handleStepThreeNext}
            onBack={handleStepThreeBack}
          />
        )}

        {currentStep === 4 && (
          <StepFour 
            onNext={handleStepFourNext}
            onBack={handleStepFourBack}
          />
        )}

        {currentStep === 5 && (
          <StepFive 
            onNext={handleStepFiveNext}
            onBack={handleStepFiveBack}
            selectedCampaigns={wizardData.selectedCampaigns || []}
          />
        )}

        {currentStep >= 6 && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Sonraki Adımlar Geliştiriliyor
            </h2>
            <p className="text-lg text-slate-600">
              Wizard'ın diğer adımları yakında eklenecek...
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SalesWizard;