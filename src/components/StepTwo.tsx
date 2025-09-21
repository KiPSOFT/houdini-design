import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Phone, Users } from 'lucide-react';

interface StepTwoProps {
  onNext: (data: { externalLines: number; internalLines: number }) => void;
  onBack: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ onNext, onBack }) => {
  const [externalLines, setExternalLines] = useState<number>(0);
  const [internalLines, setInternalLines] = useState<number>(0);

  const handleNext = () => {
    if (externalLines > 0 || internalLines > 0) {
      onNext({ externalLines, internalLines });
    }
  };

  const isValid = externalLines > 0 || internalLines > 0;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-900">
          Lütfen santral ihtiyacınızı belirleyin
        </h2>
        <p className="text-lg text-slate-600">
          Size özel ihtiyaçlarınızı belirleyerek en uygun planı oluşturalım
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        {/* External Lines */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <label className="text-lg font-semibold text-slate-900">
                Dış Hat Sayısı
              </label>
              <p className="text-sm text-slate-600">
                Dışarıdan gelen aramaları karşılayacak hat sayısı
              </p>
            </div>
          </div>
          
          <div className="relative">
            <input
              type="number"
              min="0"
              max="999"
              value={externalLines}
              onChange={(e) => setExternalLines(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
              placeholder="0"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400">
              hat
            </div>
          </div>
        </div>

        {/* Internal Lines */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <label className="text-lg font-semibold text-slate-900">
                İç Hat Sayısı
              </label>
              <p className="text-sm text-slate-600">
                Dahili kullanıcılar için gerekli hat sayısı
              </p>
            </div>
          </div>
          
          <div className="relative">
            <input
              type="number"
              min="0"
              max="999"
              value={internalLines}
              onChange={(e) => setInternalLines(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
              placeholder="0"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400">
              hat
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-blue-800 text-sm leading-relaxed">
            <strong>Bilgi:</strong> Tüm alanları doldurduğunuzda ödeme planı sayfasına geçebilirsiniz.
            Dış hat sayısı dışarıdan gelen aramaları, iç hat sayısı ise dahili kullanıcıları temsil eder.
          </p>
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
          <span>Devam Et</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default StepTwo;