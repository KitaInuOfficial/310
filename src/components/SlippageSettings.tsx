import React, { useState } from 'react';

interface SlippageSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSlippageChange: (value: string) => void;
  currentSlippage: string;
}

const SLIPPAGE_OPTIONS = ['Auto', '0.1', '0.5', '1.0'];

export const SlippageSettings = ({ 
  isOpen, 
  onClose, 
  onSlippageChange, 
  currentSlippage 
}: SlippageSettingsProps) => {
  const [customSlippage, setCustomSlippage] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-[9999]" onClick={onClose}>
      <div 
        className="w-full max-w-sm mx-0 sm:mx-4 mt-[80px] bg-[#1a2332] rounded-xl shadow-xl border border-[#2d3748]" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 p-4 lg:p-6">
          <h3 className="text-lg lg:text-xl font-semibold">Settings</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 p-4 lg:p-6">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 lg:w-5 lg:h-5 text-[#8364ac]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-medium text-sm lg:text-base">Slippage tolerance</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {SLIPPAGE_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => onSlippageChange(option)}
                className={`px-2 lg:px-4 py-2 rounded-lg font-medium transition-colors text-xs lg:text-sm ${
                  currentSlippage === option
                    ? 'bg-[#8364ac] text-white'
                    : 'bg-[#0d1117] hover:bg-[#2d3748]'
                }`}
              >
                {option}%
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="number"
              placeholder="Custom"
              value={customSlippage}
              onChange={(e) => {
                setCustomSlippage(e.target.value);
                onSlippageChange(e.target.value);
              }}
              className="w-full bg-[#0d1117] rounded-lg px-3 py-2 pr-8 text-sm lg:text-base outline-none focus:ring-2 focus:ring-[#8364ac]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm lg:text-base">%</span>
          </div>

          {parseFloat(customSlippage) > 5 && (
            <p className="text-red-500 text-xs lg:text-sm">
              ⚠️ High slippage values can result in unfavorable trades
            </p>
          )}
        </div>
      </div>
    </div>
  );
};