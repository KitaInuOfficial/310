import React, { useState } from 'react';
import { useContractRead } from 'wagmi';
import { Flame, Clock, DollarSign, HelpCircle } from 'lucide-react';
import { useTokenPrice } from '../hooks/useTokenPrice';
import { formatNumber, formatLargeNumber } from '../lib/format';
import { calculateUSDValue } from '../lib/price';

const KITA_CONTRACT = '0x546638046Ca366375Ec2610ef48F5286b303306c';

const abi = [
  {
    "inputs": [],
    "name": "totalBurned",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "burnedLast24Hours",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lifetimeBurned",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

const DashboardCard = ({ title, amount, usdValue, icon: Icon }: {
  title: string;
  amount: string;
  usdValue: string;
  icon: React.ElementType;
}) => (
  <div className="bg-gradient-to-br from-[#1a2332] to-[#0d1117] p-4 lg:p-6 rounded-xl border border-[#2d3748]">
    <div className="flex items-start justify-between">
      <div>
        <div className="text-gray-300 font-semibold text-sm lg:text-base mb-2">{title}</div>
        <div className="text-lg lg:text-xl font-semibold mb-1">{amount}</div>
        <div className="text-xs lg:text-sm text-gray-400">{usdValue}</div>
      </div>
      <div className="p-2 bg-[#2d3748] rounded-lg">
        <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-[#8364ac]" />
      </div>
    </div>
  </div>
);

export const BurnDashboard = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tokenPrice = useTokenPrice();

  const { data: totalBurned = 0n } = useContractRead({
    address: KITA_CONTRACT,
    abi,
    functionName: 'totalBurned',
    watch: true,
  });

  const { data: burnedLast24Hours = 0n } = useContractRead({
    address: KITA_CONTRACT,
    abi,
    functionName: 'burnedLast24Hours',
    watch: true,
  });

  const { data: lifetimeBurned = 0n } = useContractRead({
    address: KITA_CONTRACT,
    abi,
    functionName: 'lifetimeBurned',
    watch: true,
  });

  return (
    <div className="bg-[#1a2332] rounded-xl p-4 lg:p-6 border border-[#2d3748]">
      <div className="flex items-center gap-2 mb-4 lg:mb-6 px-2">
        <h2 className="text-lg lg:text-xl font-semibold">Dashboard</h2>
        <div className="relative">
          <HelpCircle 
            className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 cursor-help"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-[#2d3748] text-xs lg:text-sm p-3 rounded-lg shadow-lg w-48 lg:w-64 z-10">
              Track KITA token burn statistics including portal burns, recent burns, and total lifetime burns.
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <DashboardCard
          title="KITA Burned Through Portal"
          amount={formatLargeNumber(Number(totalBurned))}
          usdValue={calculateUSDValue(totalBurned, tokenPrice)}
          icon={Flame}
        />

        <DashboardCard
          title="KITA Burned Last 24h"
          amount={formatLargeNumber(Number(burnedLast24Hours))}
          usdValue={calculateUSDValue(burnedLast24Hours, tokenPrice)}
          icon={Clock}
        />

        <DashboardCard
          title="KITA Lifetime Burned"
          amount={formatLargeNumber(Number(lifetimeBurned))}
          usdValue={calculateUSDValue(lifetimeBurned, tokenPrice)}
          icon={DollarSign}
        />
      </div>
    </div>
  );
};