import React, { useState } from 'react';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { formatUnits } from 'viem';
import { Coins, Clock, AlertTriangle, Loader2, TrendingUp } from 'lucide-react';
import { Toast } from './Toast';
import { formatNumber } from '../lib/format';
import { calculateUSDValue } from '../lib/price';
import { useTokenPrice } from '../hooks/useTokenPrice';

const KITA_CONTRACT = '0x546638046Ca366375Ec2610ef48F5286b303306c';

const abi = [
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "getClaimableRewards",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "getNextClaimTime",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

export const ClaimRewards: React.FC = () => {
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const tokenPrice = useTokenPrice();
  const { address, isConnected } = useAccount();

  const { data: claimableRewards = 0n } = useContractRead({
    address: KITA_CONTRACT,
    abi,
    functionName: 'getClaimableRewards',
    args: [address ?? '0x'],
    enabled: !!address,
    watch: true,
  });

  const { data: nextClaimTime = 0n } = useContractRead({
    address: KITA_CONTRACT,
    abi,
    functionName: 'getNextClaimTime',
    args: [address ?? '0x'],
    enabled: !!address,
    watch: true,
  });

  const { writeAsync: claimRewards, isPending } = useContractWrite({
    address: KITA_CONTRACT,
    abi,
    functionName: 'claimRewards',
  });

  const handleClaim = async () => {
    try {
      await claimRewards();
      setToast({
        type: 'success',
        message: `Successfully claimed ${formatNumber(Number(formatUnits(claimableRewards, 9)))} KITA!`
      });
    } catch (error) {
      console.error('Error claiming rewards:', error);
      setToast({
        type: 'error',
        message: 'Failed to claim rewards. Please try again.'
      });
    }
  };

  const rewardsUSD = calculateUSDValue(claimableRewards, tokenPrice);
  const canClaim = claimableRewards > 0n;
  const now = Math.floor(Date.now() / 1000);
  const nextClaimTimeNumber = Number(nextClaimTime);
  const timeRemaining = nextClaimTimeNumber - now;
  const hasClaimCooldown = timeRemaining > 0;

  const formatTimeRemaining = (seconds: number) => {
    if (seconds <= 0) return 'Now';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-[#1a2332] rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">Claim Rewards</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-[#0d1117] p-6 rounded-xl flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Available Rewards</h3>
              <p className="text-2xl font-bold">{formatNumber(Number(formatUnits(claimableRewards, 9)))} KITA</p>
              <p className="text-sm text-gray-400">{rewardsUSD}</p>
            </div>
            <div className="p-3 bg-[#8364ac]/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="flex-1" />

          <button
            onClick={handleClaim}
            disabled={!canClaim || hasClaimCooldown || isPending}
            className="w-full py-3 bg-[#8364ac] hover:bg-[#6b4f91] active:bg-[#5a4279] disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Claiming...</span>
              </>
            ) : hasClaimCooldown ? (
              <>
                <Clock className="w-4 h-4" />
                <span>Next claim in {formatTimeRemaining(timeRemaining)}</span>
              </>
            ) : !canClaim ? (
              'No Rewards Available'
            ) : (
              'Claim Rewards'
            )}
          </button>
        </div>

        <div className="bg-[#0d1117] p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Rewards Info</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-sm">
              <Clock className="w-5 h-5 text-[#8364ac] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Claim Cooldown</p>
                <p className="text-gray-400">
                  After claiming, you'll need to wait 24 hours before your next claim.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <AlertTriangle className="w-5 h-5 text-[#8364ac] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Auto-Compounding</p>
                <p className="text-gray-400">
                  Unclaimed rewards are automatically reinvested to earn additional yield.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};