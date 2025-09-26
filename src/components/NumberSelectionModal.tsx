import React, { useState } from 'react';
import { X, Phone, ArrowRight, Plus, RefreshCw, Check } from 'lucide-react';

interface NumberSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: 'new' | 'transfer') => void;
}

const NumberSelectionModal: React.FC<NumberSelectionModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelect 
}) => {
  const [selectedOption, setSelectedOption] = useState<'new' | 'transfer' | null>(null);

  if (!isOpen) return null;

  const handleSelect = () => {
    if (selectedOption) {
      onSelect(selectedOption);
      onClose();
    }
  };

  const options = [
    {
      id: 'new' as const,
      title: 'Yeni bir numara almak istiyorum',
      description: 'Size özel yeni bir telefon numarası tahsis edilecek',
      icon: <Plus className="w-6 h-6" />,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      hoverColor: 'hover:bg-pink-100'
    },
    {
      id: 'transfer' as const,
      title: 'Numaramı taşımak istiyorum',
      description: 'Mevcut numaranızı sistemimize taşıyabilirsiniz',
      icon: <RefreshCw className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverColor: 'hover:bg-green-100'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 px-6 py-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Numara Seçimi</h2>
            <p className="text-white/90 text-sm">
              Telefon numarası tercihinizi belirleyin
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {options.map((option) => {
            const isSelected = selectedOption === option.id;
            
            return (
              <div
                key={option.id}
                className={`
                  relative cursor-pointer transition-all duration-200 transform
                  ${isSelected ? 'scale-[1.02] ring-2 ring-pink-500' : 'hover:scale-[1.01]'}
                `}
                onClick={() => setSelectedOption(option.id)}
              >
                <div className={`
                  p-4 rounded-xl border-2 transition-all duration-200
                  ${option.bgColor} ${option.borderColor} ${option.hoverColor}
                  ${isSelected ? 'border-pink-500 shadow-lg' : ''}
                `}>
                  <div className="flex items-start space-x-4">
                    <div className={`
                      flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
                      ${option.color} bg-white shadow-sm
                    `}>
                      {option.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {option.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {option.description}
                      </p>
                    </div>

                    {/* Selection indicator */}
                    <div className={`
                      flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                      ${isSelected 
                        ? 'border-pink-500 bg-gradient-to-r from-pink-500 to-purple-600' 
                        : 'border-slate-300'
                      }
                    `}>
                      {isSelected && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all duration-200 font-medium"
            >
              İptal
            </button>
            
            <button
              onClick={handleSelect}
              disabled={!selectedOption}
              className={`
                flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2
                ${selectedOption
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              <span>Devam Et</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberSelectionModal;