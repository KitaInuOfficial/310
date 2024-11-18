import React from 'react';
import { Flame, Loader2, AlertTriangle } from 'lucide-react';
import { TransactionProgress } from './TransactionProgress';

interface ConfirmBurnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: string;
  usdValue: string;
  isPending: boolean;
}

export const ConfirmBurnModal = ({
  isOpen,
  onClose,
  onConfirm,
  amount,
  usdValue,
  isPending
}: ConfirmBurnModalProps) => {
  if (!isOpen) return null;

  const numericAmount = parseFloat(amount.replace(/,/g, ''));
  const isLargeBurn = numericAmount >= 1000000000000; // 1T or more

  const steps = [
    {
      label: 'Confirm Transaction',
      status: isPending ? 'completed' : 'active'
    },
    {
      label: 'Sign Transaction',
      status: isPending ? 'active' : 'pending'
    },
    {
      label: 'Transaction Processing',
      status: 'pending'
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container bg-[#1a2332] rounded-xl border border-[#2d3748] shadow-xl" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-[#2d3748]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Flame className="w-5 h-5 lg:w-6 lg:h-6 text-red-500" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold">Confirm Burn</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
          <div className="bg-[#0d1117] p-4 lg:p-6 rounded-xl border border-[#2d3748] text-center">
            <p className="text-xl lg:text-2xl font-semibold mb-2">{amount} KITA</p>
            <p className="text-sm lg:text-base text-gray-400">{usdValue}</p>
          </div>

          <div className="bg-red-500/10 p-4 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-500 mb-1 text-sm lg:text-base">Warning</p>
              <p className="text-xs lg:text-sm text-gray-300">
                You are about to permanently burn these tokens. This action cannot be undone and the tokens will be removed from circulation forever.
              </p>
            </div>
          </div>

          {isLargeBurn && (
            <div className="bg-[#8364ac]/10 p-4 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-[#8364ac] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#8364ac] mb-1 text-sm lg:text-base">Large Burn Amount</p>
                <p className="text-xs lg:text-sm text-gray-300">
                  You're about to burn a significant amount of tokens. Please double-check the amount before proceeding.
                </p>
              </div>
            </div>
          )}

          <div className="bg-[#0d1117] p-4 rounded-xl">
            <TransactionProgress steps={steps} />
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 lg:p-6 border-t border-[#2d3748] flex gap-4">
          <button
            onClick={onClose}
            disabled={isPending}
            className="flex-1 px-4 py-2 lg:py-3 bg-[#2d3748] hover:bg-[#3a4a63] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors text-sm lg:text-base"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="flex-1 px-4 py-2 lg:py-3 bg-gradient-to-r from-[#8364ac] to-[#6b4f91] hover:from-[#6b4f91] hover:to-[#5a4279] disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm lg:text-base"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Burning...</span>
              </>
            ) : (
              'Confirm Burn'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};