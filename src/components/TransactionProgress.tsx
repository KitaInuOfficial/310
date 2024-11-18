import React from 'react';

interface TransactionProgressProps {
  steps: {
    label: string;
    status: 'pending' | 'active' | 'completed' | 'error';
  }[];
}

export const TransactionProgress: React.FC<TransactionProgressProps> = ({ steps }) => {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              step.status === 'completed'
                ? 'bg-green-500'
                : step.status === 'active'
                ? 'bg-[#8364ac] animate-pulse'
                : step.status === 'error'
                ? 'bg-red-500'
                : 'bg-gray-700'
            }`}
          >
            {step.status === 'completed' && (
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {step.status === 'error' && (
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </div>
          <span
            className={`${
              step.status === 'active'
                ? 'text-white font-medium'
                : step.status === 'completed'
                ? 'text-green-500'
                : step.status === 'error'
                ? 'text-red-500'
                : 'text-gray-400'
            }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}