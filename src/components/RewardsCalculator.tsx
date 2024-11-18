import React, { useState } from 'react';
import { X } from 'lucide-react';
import { calculateAPY, calculateRewards } from '../lib/staking';
import { formatNumber } from '../lib/format';
import { calculateUSDValue } from '../lib/price';

interface RewardsCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  stakingTiers: Array<{ duration: number; apy: number; label: string }>;
  tokenPrice: number;
}

export const RewardsCalculator: React.FC<RewardsCalculatorProps> = ({
  isOpen,
  onClose,
  stakingTiers,
  tokenPrice,
}) => {
  const [amount, setAmount] = useState('1000000000');
  const [selectedTier, setSelectedTier] = useState(stakingTiers[0]);

  if (!isOpen) return null;

  const monthlyRewards = calculateRewards(Number(amount), selectedTier.apy, 30);
  const periodRewards = calculateRewards(Number(amount), selectedTier.apy, selectedTier.duration);
  const yearlyRewards = calculateAPY(Number(amount), selectedTier.apy);

  const monthlyUSD = calculateUSDValue(BigInt(Math.floor(monthlyRewards)), tokenPrice);
  const periodUSD = calculateUSDValue(BigInt(Math.floor(periodRewards)), tokenPrice);
  const yearlyUSD = calculateUSDValue(BigInt(Math.floor(yearlyRewards)), tokenPrice);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-[#1a2332] rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Rewards Calculator</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Amount to Stake</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#0d1117] rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#8364ac]"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Lock Period</label>
            <div className="grid grid-cols-2 gap-2">
              {stakingTiers.map((tier) => (
                <button
                  key={tier.duration}
                  onClick={() => setSelectedTier(tier)}
                  className={`p-3 rounded-lg transition-colors ${
                    selectedTier.duration === tier.duration
                      ? 'bg-[#8364ac] text-white'
                      : 'bg-[#0d1117] hover:bg-[#2d3748]'
                  }`}
                >
                  <div className="text-sm font-medium">{tier.label}</div>
                  <div className="text-xs opacity-80">{tier.apy}% APY</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#0d1117] p-4 rounded-lg space-y-4">
            <div>
              <h4 className="text-sm text-gray-400 mb-2">Monthly Rewards</h4>
              <p className="text-lg font-semibold">{formatNumber(monthlyRewards)} KITA</p>
              <p className="text-sm text-gray-400">{monthlyUSD}</p>
            </div>

            <div>
              <h4 className="text-sm text-gray-400 mb-2">Period Rewards ({selectedTier.label})</h4>
              <p className="text-lg font-semibold">{formatNumber(periodRewards)} KITA</p>
              <p className="text-sm text-gray-400">{periodUSD}</p>
            </div>

            <div>
              <h4 className="text-sm text-gray-400 mb-2">Yearly Rewards</h4>
              <p className="text-lg font-semibold">{formatNumber(yearlyRewards)} KITA</p>
              <p className="text-sm text-gray-400">{yearlyUSD}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};