import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Phone, Plane, Mic, Hash, Megaphone, Zap, Info, X, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  price: number;
  unit: string;
  color: string;
  bgColor: string;
  type: 'service' | 'number' | 'addon' | 'toggle';
  quantity?: number;
  enabled?: boolean;
  options?: string[];
  selectedOption?: string;
}

interface StepFiveProps {
  onNext: (data: { selectedProducts: any[] }) => void;
  onBack: () => void;
  selectedCampaigns: string[];
}

const StepFive: React.FC<StepFiveProps> = ({ onNext, onBack, selectedCampaigns }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'virtual-pbx',
      title: 'Sanal Santral',
      description: 'Sanal santral hizmeti',
      icon: <Phone className="w-5 h-5" />,
      price: 35.00,
      unit: 'Aylık',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      type: 'service'
    },
    {
      id: 'outbound-number',
      title: 'Çıkış Numarası',
      description: 'Şirketinizin numara sayısı',
      icon: <Plane className="w-5 h-5" />,
      price: 18.00,
      unit: 'Aylık',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      type: 'number',
      quantity: 1
    },
    {
      id: 'voice-package',
      title: 'Ses Paketi',
      description: 'Aylık ses paketi',
      icon: <Mic className="w-5 h-5" />,
      price: 0.00,
      unit: 'Aylık',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      type: 'addon',
      options: ['Seçiniz', 'Temel Paket', 'Standart Paket', 'Premium Paket'],
      selectedOption: 'Seçiniz'
    },
    {
      id: 'internal-number',
      title: 'Dahili Santral Numarası',
      description: 'Dahili santral numarası',
      icon: <Hash className="w-5 h-5" />,
      price: 15.00,
      unit: 'Aylık',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      type: 'number',
      quantity: 1
    },
    {
      id: 'welcome-announcement',
      title: 'Karşılama Anonsu',
      description: 'IVR karşılama anonsu',
      icon: <Megaphone className="w-5 h-5" />,
      price: 1500.00,
      unit: 'Tek seferlik',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      type: 'toggle',
      enabled: true
    },
    {
      id: 'activation-fee',
      title: 'Aktivasyon Ücreti',
      description: 'Hizmet aktivasyon ücreti',
      icon: <Zap className="w-5 h-5" />,
      price: 3000.00,
      unit: 'Tek seferlik',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      type: 'toggle',
      enabled: true
    }
  ]);

  const updateProductQuantity = (productId: string, quantity: number) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, quantity: Math.max(0, quantity) }
        : product
    ));
  };

  const updateProductOption = (productId: string, option: string) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, selectedOption: option }
        : product
    ));
  };

  const toggleProduct = (productId: string) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, enabled: !product.enabled }
        : product
    ));
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      if (product.type === 'toggle' && !product.enabled) return total;
      if (product.type === 'number') return total + (product.price * (product.quantity || 1));
      return total + product.price;
    }, 0);
  };

  const calculateMonthlyTotal = () => {
    return products.reduce((total, product) => {
      if (product.type === 'toggle' && !product.enabled) return total;
      if (product.unit === 'Tek seferlik') return total;
      if (product.type === 'number') return total + (product.price * (product.quantity || 1));
      return total + product.price;
    }, 0);
  };

  const calculateOneTimeTotal = () => {
    return products.reduce((total, product) => {
      if (product.type === 'toggle' && !product.enabled) return total;
      if (product.unit !== 'Tek seferlik') return total;
      return total + product.price;
    }, 0);
  };

  const handleNext = () => {
    const selectedProducts = products.filter(product => {
      if (product.type === 'toggle') return product.enabled;
      if (product.type === 'number') return (product.quantity || 0) > 0;
      if (product.type === 'addon') return product.selectedOption !== 'Seçiniz';
      return true;
    });
    
    onNext({ selectedProducts });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-orange-100 text-orange-800 rounded-full text-sm font-medium">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Ürünler
        </div>
        
        <h2 className="text-3xl font-bold text-slate-900">
          Seçtiğiniz ürünler
        </h2>
        <p className="text-lg text-slate-600">
          Seçilen abonelikleriniz ve ürün detayları
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Products */}
        <div className="lg:col-span-2 space-y-6">
          {/* Campaign Banner */}
          {selectedCampaigns && selectedCampaigns.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">Seçtiğiniz Kampanya</h4>
                    <p className="text-green-700 text-sm">2 Dahili 1 Dış Hat 815₺ yerine 495₺</p>
                  </div>
                </div>
                <button className="text-green-600 hover:text-green-800">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Products List */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Seçilen abonelikleriniz ({products.length} abonelik)
            </h3>

            <div className="space-y-4">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="border border-slate-200 rounded-xl p-4 hover:border-pink-300 transition-all duration-200"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideUp 0.6s ease-out forwards'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${product.bgColor} rounded-lg flex items-center justify-center ${product.color}`}>
                        {product.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-slate-900">{product.title}</h4>
                          <button className="text-slate-400 hover:text-slate-600">
                            <Info className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-slate-600 text-sm">{product.description}</p>
                        
                        {/* Product Controls */}
                        <div className="mt-3">
                          {product.type === 'number' && (
                            <div className="flex items-center space-x-3">
                              <input
                                type="number"
                                min="0"
                                max="99"
                                value={product.quantity || 0}
                                onChange={(e) => updateProductQuantity(product.id, parseInt(e.target.value) || 0)}
                                className="w-16 px-2 py-1 border border-slate-300 rounded-lg text-center text-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
                              />
                              <button
                                onClick={() => updateProductQuantity(product.id, (product.quantity || 0) + 1)}
                                className="px-3 py-1 bg-pink-100 text-pink-600 rounded-lg text-sm hover:bg-pink-200 transition-colors"
                              >
                                1. Numara seçimi
                              </button>
                            </div>
                          )}
                          
                          {product.type === 'addon' && product.options && (
                            <select
                              value={product.selectedOption}
                              onChange={(e) => updateProductOption(product.id, e.target.value)}
                              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
                            >
                              {product.options.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          )}
                          
                          {product.type === 'toggle' && (
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={product.enabled}
                                onChange={() => toggleProduct(product.id)}
                                className="sr-only"
                              />
                              <div className={`w-10 h-6 rounded-full transition-colors ${
                                product.enabled ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-slate-300'
                              }`}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform mt-1 ${
                                  product.enabled ? 'translate-x-5' : 'translate-x-1'
                                }`}></div>
                              </div>
                              <span className="text-sm text-slate-600">
                                {product.enabled ? 'Aktif' : 'Pasif'}
                              </span>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="font-semibold text-slate-900">
                        ₺{product.type === 'number' 
                          ? (product.price * (product.quantity || 1)).toFixed(2)
                          : product.price.toFixed(2)
                        }
                      </div>
                      <div className="text-xs text-slate-500">({product.unit})</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Ödeme Bilgileri</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Aylık Ödeme</span>
                <span className="font-semibold text-slate-900">₺{calculateMonthlyTotal().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Tek Seferlik Ödeme</span>
                <span className="font-semibold text-slate-900">₺{calculateOneTimeTotal().toFixed(2)}</span>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-purple-900">Toplam İlk Ödeme</span>
                  <span className="text-2xl font-bold text-purple-900">
                    ₺{(calculateMonthlyTotal() + calculateOneTimeTotal()).toFixed(2)}
                  </span>
                </div>
                <p className="text-purple-700 text-sm mt-1">
                  Sonraki aylar: ₺{calculateMonthlyTotal().toFixed(2)}/ay
                </p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full mt-6 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white py-4 rounded-xl font-semibold hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Siparişi Tamamla</span>
            </button>
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

        <div className="text-sm text-slate-500">
          Adım 5/8 - Ürün seçimi tamamlandı
        </div>
      </div>
    </div>
  );
};

export default StepFive;