import React from 'react';
import { Calculator, HelpCircle } from 'lucide-react';
import { formatTokenAmount } from '../lib/price';

interface StakingFormProps {
  amount: string;
  setAmount: (amount: string) => void;
  selectedTier: { duration: number; apy: number; label: string };
  setSelectedTier: (tier: any) => void;
  balance: bigint;
  isConnected: boolean;
  balanceUSD: string;
  stakeAmountUSD: string;
  handleSetMax: () => void;
  stakingTiers: Array<{ duration: number; apy: number; label: string }>;
  setShowTooltip: (tooltip: string | null) => void;
  showTooltip: string | null;
  setIsCalculatorOpen: (isOpen: boolean) => void;
  monthlyRewards: number;
  yearlyRewards: number;
}

export const StakingForm: React.FC<StakingFormProps> = ({
  amount,
  setAmount,
  balance,
  isConnected,
  balanceUSD,
  stakeAmountUSD,
  handleSetMax,
  setShowTooltip,
  showTooltip,
  setIsCalculatorOpen,
}) => {
  const formattedBalance = isConnected ? formatTokenAmount(balance) : '0';

  return (
    <div className="flex-1 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Stake</h2>
          <div className="relative">
            <HelpCircle 
              className="w-5 h-5 text-gray-400 cursor-help"
              onMouseEnter={() => setShowTooltip('stake')}
              onMouseLeave={() => setShowTooltip(null)}
            />
            {showTooltip === 'stake' && (
              <div className="absolute left-0 sm:left-full ml-2 top-full sm:top-1/2 sm:-translate-y-1/2 mt-2 sm:mt-0 bg-[#2d3748] text-sm p-3 rounded-lg shadow-lg w-64 z-10">
                Stake your KITA tokens to earn rewards. The longer you stake, the higher your APY.
              </div>
            )}
          </div>
        </div>
        <button 
          onClick={() => setIsCalculatorOpen(true)}
          className="p-2 bg-[#2d3748] hover:bg-[#3a4a63] rounded-lg transition-colors"
          title="Calculate Rewards"
        >
          <Calculator className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-[#0d1117] p-4 rounded-lg mb-6 backdrop-blur-xl bg-opacity-60">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <span className="text-[#8364ac] font-semibold flex items-center gap-2 text-base">
            <img src="https://kitainu.org/logo.svg" alt="KITA" className="w-6 h-6" />
            Stake KITA
          </span>
          <div className="flex flex-col sm:items-end">
            <div className="flex items-center gap-2 justify-between sm:justify-end">
              <span className="text-gray-400">Balance:</span>
              <span className="text-gray-400">{formattedBalance} KITA</span>
              {isConnected && (
                <button
                  onClick={handleSetMax}
                  className="px-2 py-1 text-sm bg-[#2d3748] hover:bg-[#3a4a63] rounded transition-colors ml-2"
                >
                  Max
                </button>
              )}
            </div>
            <div className="text-sm text-gray-500">{balanceUSD}</div>
          </div>
        </div>
        <div className="relative mt-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent text-2xl outline-none font-medium"
            placeholder="0.0"
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <span className="text-gray-500 text-lg">KITA</span>
          </div>
        </div>
        {amount !== '0' && (
          <div className="text-sm text-gray-500 mt-2">≈ {stakeAmountUSD}</div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {[1, 5, 10, 25, 50, 100, 500, 1000].map((value) => (
          <button
            key={value}
            onClick={() => setAmount((value * 1_000_000_000).toString())}
            className="px-3 py-2 rounded-lg hover:bg-[#3a4a63] transition-colors font-medium bg-[#2d3748] text-sm"
          >
            {value}B
          </button>
        ))}
      </div>
    </div>
  );
};