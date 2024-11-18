import React from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';
import { TransactionProgress } from './TransactionProgress';
import { formatNumber, formatLargeNumber } from '../lib/format';

interface ConfirmStakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: string;
  usdValue: string;
  duration: number;
  label: string;
  apy: number;
  estimatedRewards: number;
  isPending: boolean;
}

export const ConfirmStakeModal: React.FC<ConfirmStakeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  amount,
  usdValue,
  duration,
  label,
  apy,
  estimatedRewards,
  isPending
}) => {
  if (!isOpen) return null;

  const numericAmount = parseFloat(amount);
  const isLargeStake = numericAmount >= 1000000000000; // 1T or more

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-[#1a2332] rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-semibold mb-4">Confirm Stake</h3>
        
        <div className="bg-[#0d1117] p-4 rounded-lg mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold mb-1">
              {formatLargeNumber(parseFloat(amount))} KITA
            </p>
            <p className="text-gray-400">{usdValue}</p>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-sm text-gray-400">Lock Period</p>
              <p className="font-medium">{label}</p>
              <p className="text-[#8364ac]">{apy}% APY</p>
            </div>
          </div>
        </div>

        {isLargeStake && (
          <div className="bg-[#8364ac]/10 p-4 rounded-lg mb-6 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#8364ac] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#8364ac] mb-1">Large Stake Amount</p>
              <p className="text-sm text-gray-400">
                You're about to stake a significant amount of tokens. Please double-check the amount and lock period before proceeding.
              </p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <TransactionProgress steps={steps} />
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            disabled={isPending}
            className="flex-1 px-4 py-2 bg-[#2d3748] hover:bg-[#3a4a63] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="flex-1 px-4 py-2 bg-[#8364ac] hover:bg-[#6b4f91] disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Staking...</span>
              </>
            ) : (
              'Confirm Stake'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};