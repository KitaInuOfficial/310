import React from 'react';
import { Coins, TrendingUp, Clock, Users, ChartBar } from 'lucide-react';
import { useContractRead } from 'wagmi';
import { formatUnits } from 'viem';
import { useTokenPrice } from '../hooks/useTokenPrice';
import { formatNumber, formatLargeNumber } from '../lib/format';
import { calculateAPY } from '../lib/staking';

const KITA_STAKING = '0x546638046Ca366375Ec2610ef48F5286b303306c';
const DISPLAY_AMOUNT = 1_000_000_000; // 1B KITA

const abi = [
  {
    "inputs": [],
    "name": "totalStaked",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

export const Dashboard = () => {
  const tokenPrice = useTokenPrice();

  const { data: totalStaked = 0n } = useContractRead({
    address: KITA_STAKING,
    abi,
    functionName: 'totalStaked',
    watch: true,
  });

  const stakingTiers = [
    { duration: 30, apy: 8, label: '1 Month' },
    { duration: 90, apy: 12, label: '3 Months' },
    { duration: 180, apy: 16, label: '6 Months' },
    { duration: 365, apy: 20, label: '1 Year' },
  ];

  return (
    <div className="bg-[#1a2332] rounded-xl p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Staking Overview</h2>
      
      <div className="grid gap-4 flex-1">
        <div className="bg-[#0d1117] p-6 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Total Value Locked</h3>
              <p className="text-2xl font-bold">{formatNumber(Number(formatUnits(totalStaked, 9)))} KITA</p>
              <p className="text-sm text-gray-400">${formatNumber(Number(formatUnits(totalStaked, 9)) * tokenPrice)}</p>
            </div>
            <div className="p-3 bg-[#8364ac]/10 rounded-lg">
              <Coins className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0d1117] p-6 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Best APY</h3>
                <p className="text-2xl font-bold">20%</p>
                <p className="text-sm text-gray-400">1 Year lock</p>
              </div>
              <div className="p-3 bg-[#8364ac]/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-[#0d1117] p-6 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Active Stakers</h3>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-sm text-gray-400">+123 this week</p>
              </div>
              <div className="p-3 bg-[#8364ac]/10 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0d1117] p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Staking Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm">1 Month</div>
              <div className="flex-1 h-2 bg-[#2d3748] rounded-full overflow-hidden">
                <div className="h-full bg-[#8364ac] rounded-full" style={{ width: '15%' }} />
              </div>
              <div className="w-16 text-sm text-right">15%</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm">3 Months</div>
              <div className="flex-1 h-2 bg-[#2d3748] rounded-full overflow-hidden">
                <div className="h-full bg-[#8364ac] rounded-full" style={{ width: '25%' }} />
              </div>
              <div className="w-16 text-sm text-right">25%</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm">6 Months</div>
              <div className="flex-1 h-2 bg-[#2d3748] rounded-full overflow-hidden">
                <div className="h-full bg-[#8364ac] rounded-full" style={{ width: '35%' }} />
              </div>
              <div className="w-16 text-sm text-right">35%</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm">1 Year</div>
              <div className="flex-1 h-2 bg-[#2d3748] rounded-full overflow-hidden">
                <div className="h-full bg-[#8364ac] rounded-full" style={{ width: '25%' }} />
              </div>
              <div className="w-16 text-sm text-right">25%</div>
            </div>
          </div>
        </div>

        <div className="bg-[#0d1117] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Staking Tiers</h3>
            <div className="text-sm text-gray-400">Returns per 1B KITA</div>
          </div>
          <div className="space-y-4">
            {stakingTiers.map((tier) => (
              <div key={tier.duration} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{tier.label}</p>
                  <p className="text-sm text-gray-400">Lock Period</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#8364ac]">{tier.apy}% APY</p>
                  <p className="text-sm text-gray-400">
                    +{formatNumber(calculateAPY(DISPLAY_AMOUNT, tier.apy))} KITA/year
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};