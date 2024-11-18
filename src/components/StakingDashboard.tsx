import React from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { Coins, Clock, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useTokenPrice } from '../hooks/useTokenPrice';
import { formatNumber, formatLargeNumber } from '../lib/format';
import { calculateUSDValue } from '../lib/price';

const KITA_CONTRACT = '0x546638046Ca366375Ec2610ef48F5286b303306c';

const abi = [
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "stakedBalance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "earnedRewards",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "stakingEndTime",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

export const StakingDashboard = () => {
  const { address, isConnected } = useAccount();
  const tokenPrice = useTokenPrice();

  const { data: stakedBalance = 0n } = useContractRead({
    address: KITA_CONTRACT,
    abi,
    functionName: 'stakedBalance',
    args: [address ?? '0x'],
    enabled: !!address,
    watch: true,
  });

  const { data: earnedRewards = 0n } = useContractRead({
    address: KITA_CONTRACT,
    abi,
    functionName: 'earnedRewards',
    args: [address ?? '0x'],
    enabled: !!address,
    watch: true,
  });

  const { data: stakingEndTime = 0n } = useContractRead({
    address: KITA_CONTRACT,
    abi,
    functionName: 'stakingEndTime',
    args: [address ?? '0x'],
    enabled: !!address,
    watch: true,
  });

  const remainingTime = Number(stakingEndTime) * 1000 - Date.now();
  const daysRemaining = Math.max(0, Math.floor(remainingTime / (1000 * 60 * 60 * 24)));
  
  const ROI = isConnected && Number(stakedBalance) > 0
    ? formatNumber(Number(earnedRewards) / Number(stakedBalance) * 100)
    : '0';

  return (
    <div className="bg-[#1a2332] rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1 text-[#8364ac]">
            <ArrowUpRight className="w-4 h-4" />
            +{ROI}% ROI
          </span>
        </div>
      </div>
      
      <div className="grid gap-4 flex-1">
        <div className="bg-[#0d1117] p-6 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Total Staked KITA</h3>
              <p className="text-2xl font-bold">{formatLargeNumber(Number(stakedBalance))}</p>
              <p className="text-sm text-gray-400">{calculateUSDValue(stakedBalance, tokenPrice)}</p>
            </div>
            <div className="p-3 bg-[#8364ac]/10 rounded-lg">
              <Coins className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#0d1117] p-6 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Earned Rewards</h3>
              <p className="text-2xl font-bold">{formatLargeNumber(Number(earnedRewards))}</p>
              <p className="text-sm text-gray-400">{calculateUSDValue(earnedRewards, tokenPrice)}</p>
            </div>
            <div className="p-3 bg-[#8364ac]/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#0d1117] p-6 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Time Until Unlock</h3>
              <p className="text-2xl font-bold">{daysRemaining} Days</p>
              <p className="text-sm text-gray-400">Staking Period Active</p>
            </div>
            <div className="p-3 bg-[#8364ac]/10 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};