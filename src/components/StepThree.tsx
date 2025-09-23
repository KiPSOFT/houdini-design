import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, CalendarCheck, Percent, Zap } from 'lucide-react';

interface PaymentPlan {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  badge?: string;
  savings?: string;
}

interface StepThreeProps {
  onNext: (data: { paymentPlan: string }) => void;
  onBack: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({ onNext, onBack }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const paymentPlans: PaymentPlan[] = [
    {
      id: 'monthly',
      title: 'Aylık',
      description: 'Her ay düzenli ödeme',
      icon: <Calendar className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'semi-annual',
      title: '6 Aylık',
      description: '6 ayda bir ödeme ile avantaj',
      icon: <CalendarCheck className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      savings: '%10 Tasarruf'
    },
    {
      id: 'yearly',
      title: 'Yıllık',
      description: 'Yıllık tek ödeme ile tasarruf',
      icon: <CalendarCheck className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200 hover:bg-green-100',
      badge: 'Önerilen',
      savings: '%20 Tasarruf'
    }
  ];

  const handleNext = () => {
    if (selectedPlan) {
      onNext({ paymentPlan: selectedPlan });
    }
  };

  const isValid = selectedPlan !== '';

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 rounded-full text-sm font-medium">
          <Percent className="w-4 h-4 mr-2" />
          Ödeme Planı
        </div>
        
        <h2 className="text-3xl font-bold text-slate-900">
          Ödeme planınızı seçin
        </h2>
        <p className="text-lg text-slate-600">
          Size en uygun ödeme seçeneğini belirleyin
        </p>
      </div>

      {/* Payment Plans */}
      <div className="space-y-4">
        {paymentPlans.map((plan, index) => (
          <div
            key={plan.id}
            className={`relative cursor-pointer transition-all duration-300 transform ${
              selectedPlan === plan.id 
               ? 'scale-[1.02] shadow-lg ring-2 ring-pink-500' 
                : 'hover:scale-[1.01] hover:shadow-md'
            }`}
            onClick={() => setSelectedPlan(plan.id)}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'slideUp 0.6s ease-out forwards'
            }}
          >
            <div className={`p-6 rounded-xl border-2 ${plan.bgColor} ${selectedPlan === plan.id ? 'border-blue-500' : ''} transition-all duration-200`}>
           <div className={`p-6 rounded-xl border-2 ${plan.bgColor} ${selectedPlan === plan.id ? 'border-pink-500' : ''} transition-all duration-200`}>
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>{plan.badge}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`flex-shrink-0 p-3 rounded-lg ${plan.color} bg-white shadow-sm`}>
                    {plan.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-semibold text-slate-900">
                        {plan.title}
                      </h3>
                      {plan.savings && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          {plan.savings}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 mt-1">
                      {plan.description}
                    </p>
                  </div>
                </div>

                {/* Selection indicator */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  selectedPlan === plan.id 
                   ? 'border-pink-500 bg-gradient-to-r from-pink-500 to-purple-600' 
                    : 'border-slate-300'
                }`}>
                  {selectedPlan === plan.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-pink-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-purple-900 mb-1">Ödeme Bilgisi</h4>
            <p className="text-purple-800 text-sm leading-relaxed">
              Yıllık ödeme seçeneği ile %20 tasarruf sağlayabilirsiniz. 
              Ödeme planınızı istediğiniz zaman değiştirebilirsiniz.
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
              ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }
          `}
        >
          <span>Devam Et</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default StepThree;