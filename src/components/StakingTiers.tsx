import React from 'react';
import { Lock, HelpCircle, TrendingUp, Coins, Timer, Clock1, Clock4, Clock12 } from 'lucide-react';
import { calculateAPY } from '../lib/staking';
import { formatNumber } from '../lib/format';

interface StakingTiersProps {
  stakingTiers: Array<{
    duration: number;
    apy: number;
    label: string;
  }>;
  selectedTier: {
    duration: number;
    apy: number;
    label: string;
  };
  setSelectedTier: (tier: any) => void;
  amount: string;
  setShowTooltip: (tooltip: string | null) => void;
  showTooltip: string | null;
}

const DISPLAY_AMOUNT = 1_000_000_000; // 1B KITA

const getDurationIcon = (duration: number) => {
  switch (duration) {
    case 30: return Timer;
    case 90: return Clock1;
    case 180: return Clock4;
    case 365: return Clock12;
    default: return Timer;
  }
};

export const StakingTiers: React.FC<StakingTiersProps> = ({
  stakingTiers,
  selectedTier,
  setSelectedTier,
  amount,
  setShowTooltip,
  showTooltip,
}) => {
  const maxApy = Math.max(...stakingTiers.map(tier => tier.apy));

  return (
    <div className="space-y-6">
      <div className="bg-[#0d1117] p-4 sm:p-6 rounded-lg backdrop-blur-xl bg-opacity-60">
        <div className="flex items-center gap-2 mb-6">
          <h3 className="text-lg font-semibold">Select Lock Period</h3>
          <div className="relative">
            <HelpCircle 
              className="w-4 h-4 text-gray-400 cursor-help"
              onMouseEnter={() => setShowTooltip('lock')}
              onMouseLeave={() => setShowTooltip(null)}
            />
            {showTooltip === 'lock' && (
              <div className="absolute left-0 sm:left-full ml-2 top-full sm:top-1/2 sm:-translate-y-1/2 mt-2 sm:mt-0 bg-[#2d3748] text-sm p-3 rounded-lg shadow-lg w-64 z-10">
                Choose how long to lock your tokens. Longer periods earn higher rewards.
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {stakingTiers.map((tier) => (
            <button
              key={tier.duration}
              onClick={() => setSelectedTier(tier)}
              className={`p-4 sm:p-6 rounded-lg transition-all ${
                selectedTier.duration === tier.duration
                  ? 'bg-gradient-to-br from-[#8364ac] to-[#6b4f91] ring-2 ring-[#9575bd]'
                  : 'bg-[#2d3748] hover:bg-[#3a4a63]'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-4 h-4" />
                <span className="font-medium">{tier.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">{tier.apy}%</p>
                <p className="text-sm text-gray-400">APY</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#0d1117] p-4 sm:p-6 rounded-lg backdrop-blur-xl bg-opacity-60">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-semibold">Rewards per 1B KITA</h3>
          <div className="px-3 py-1.5 bg-[#2d3748] rounded-lg text-sm font-medium text-[#8364ac]">APY</div>
        </div>

        <div className="grid gap-6">
          {stakingTiers.map((tier) => {
            const rewardsAmount = calculateAPY(DISPLAY_AMOUNT, tier.apy);
            const percentage = (tier.apy / maxApy) * 100;
            const isSelected = selectedTier.duration === tier.duration;
            const Icon = getDurationIcon(tier.duration);
            
            return (
              <div 
                key={tier.duration} 
                className={`relative ${isSelected ? 'scale-[1.02]' : ''} transition-all duration-200`}
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${
                  isSelected 
                    ? 'from-[#8364ac]/20 to-[#6b4f91]/20' 
                    : 'from-transparent to-transparent'
                } transition-colors duration-200`} />
                
                <div className={`relative p-4 rounded-xl border ${
                  isSelected 
                    ? 'border-[#8364ac]/30 bg-[#2d3748]/30' 
                    : 'border-transparent bg-[#2d3748]/10'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isSelected ? 'bg-[#8364ac]/20' : 'bg-[#2d3748]'
                      }`}>
                        <Icon className={`w-4 h-4 ${
                          isSelected ? 'text-[#8364ac]' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <span className="font-medium block">{tier.label}</span>
                        <span className={`text-sm ${
                          isSelected ? 'text-[#8364ac]' : 'text-gray-400'
                        }`}>{tier.apy}% APY</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`w-5 h-5 ${
                        isSelected ? 'text-[#8364ac]' : 'text-gray-500'
                      }`} />
                      <span className={`font-medium ${
                        isSelected ? 'text-[#8364ac]' : 'text-gray-400'
                      }`}>
                        +{formatNumber(rewardsAmount)} KITA
                      </span>
                    </div>
                  </div>

                  <div className="relative h-2 bg-[#1a2332] rounded-full overflow-hidden">
                    <div 
                      className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                        isSelected 
                          ? 'bg-gradient-to-r from-[#8364ac] to-[#6b4f91]' 
                          : 'bg-[#2d3748]'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};