import React, { useState, useEffect } from 'react';
import { CircleDollarSign, Coins, BarChart3, HelpCircle } from 'lucide-react';
import { formatNumber, formatLargeNumber } from '../lib/format';

const TOTAL_SUPPLY = 1000000000000000; // 1 quadrillion
const INITIAL_PRICE = 0.0000000000; // Initial price

const StatCard = ({ title, value, subValue, icon: Icon, isPercentage = false }: {
  title: string;
  value: string;
  subValue?: string;
  icon: React.ElementType;
  isPercentage?: boolean;
}) => (
  <div className="bg-gradient-to-br from-[#1a2332] to-[#0d1117] p-4 lg:p-6 rounded-xl border border-[#2d3748]">
    <div className="flex items-start justify-between">
      <div>
        <div className="text-gray-300 font-semibold text-sm lg:text-base mb-2">{title}</div>
        <div className="text-lg lg:text-xl font-semibold mb-1">{value}</div>
        {subValue && (
          <div className={`text-xs lg:text-sm ${isPercentage ? 'text-white' : 'text-gray-400'}`}>
            {isPercentage && Number(subValue.replace('%', '')) !== 0 ? (
              Number(subValue.replace('%', '')) > 0 ? `+${subValue}` : subValue
            ) : subValue}
          </div>
        )}
      </div>
      <div className="p-2 bg-[#2d3748] rounded-lg">
        <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-[#8364ac]" />
      </div>
    </div>
  </div>
);

export const BurnStats = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [marketCapChange, setMarketCapChange] = useState<string>('0');

  return (
    <div className="bg-[#1a2332] rounded-xl p-4 lg:p-6 border border-[#2d3748]">
      <div className="flex items-center gap-2 mb-4 lg:mb-6 px-2">
        <h2 className="text-lg lg:text-xl font-semibold">Market Stats</h2>
        <div className="relative">
          <HelpCircle 
            className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 cursor-help"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-[#2d3748] text-xs lg:text-sm p-3 rounded-lg shadow-lg w-48 lg:w-64 z-10">
              Real-time market statistics for KITA token including price, market cap, and supply information.
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <StatCard
          title="KITA Price"
          value={`$${INITIAL_PRICE.toFixed(10)}`}
          subValue="$0.00"
          icon={CircleDollarSign}
        />
        <StatCard
          title="Market Cap"
          value="$0.00"
          subValue={`${marketCapChange}%`}
          icon={BarChart3}
          isPercentage={true}
        />
        <StatCard
          title="Remaining Supply"
          value={`${formatLargeNumber(TOTAL_SUPPLY)} KITA`}
          subValue="$0.00"
          icon={Coins}
        />
      </div>
    </div>
  );
};