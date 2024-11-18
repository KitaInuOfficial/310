import React from 'react';
import { formatNumber } from '../lib/format';

interface StakingRewardsPreviewProps {
  monthlyRewards: number;
  yearlyRewards: number;
  selectedTier: {
    label: string;
  };
}

export const StakingRewardsPreview: React.FC<StakingRewardsPreviewProps> = ({
  monthlyRewards,
  yearlyRewards,
  selectedTier,
}) => {
  return (
    <div className="bg-[#0d1117] p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-3">Estimated Rewards</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Monthly:</span>
          <span className="font-medium">+{formatNumber(monthlyRewards)} KITA</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Yearly:</span>
          <span className="font-medium">+{formatNumber(yearlyRewards)} KITA</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Lock Period:</span>
          <span className="font-medium">{selectedTier.label}</span>
        </div>
      </div>
    </div>
  );
};