import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
}

interface WizardStepperProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

const WizardStepper: React.FC<WizardStepperProps> = ({ steps, currentStep, completedSteps }) => {
  return (
    <div className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = completedSteps.includes(stepNumber);
            const isCurrent = currentStep === stepNumber;
            const isUpcoming = stepNumber > currentStep;

            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      relative w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                      ${isCompleted 
                        ? 'bg-green-500 text-white shadow-lg' 
                        : isCurrent 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg ring-4 ring-pink-200' 
                        : 'bg-slate-200 text-slate-500'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{stepNumber}</span>
                    )}
                    
                    {/* Pulse animation for current step */}
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 animate-ping opacity-20"></div>
                    )}
                  </div>
                  
                  {/* Step Info */}
                  <div className="mt-3 text-center max-w-24">
                    <div
                      className={`
                        text-xs font-medium transition-colors duration-200
                        ${isCurrent ? 'text-pink-600' : isCompleted ? 'text-green-600' : 'text-slate-500'}
                      `}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 hidden sm:block">
                      {step.description}
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4 mt-[-2rem]">
                    <div
                      className={`
                        h-0.5 transition-all duration-500
                        ${isCompleted || (isCurrent && index < currentStep - 1)
                          ? 'bg-green-500' 
                          : isCurrent && index === currentStep - 1
                          ? 'bg-gradient-to-r from-pink-500 to-slate-200'
                          : 'bg-slate-200'
                        }
                      `}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WizardStepper;