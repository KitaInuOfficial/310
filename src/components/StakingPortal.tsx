import React, { useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useContractWrite, useContractRead } from 'wagmi';
import { parseUnits } from 'viem';
import { Loader2 } from 'lucide-react';
import { ConfirmStakeModal } from './ConfirmStakeModal';
import { RewardsCalculator } from './RewardsCalculator';
import { StakingForm } from './StakingForm';
import { StakingTiers } from './StakingTiers';
import { useTokenPrice } from '../hooks/useTokenPrice';
import { Toast } from './Toast';
import { calculateUSDValue } from '../lib/price';
import { calculateAPY, calculateRewards } from '../lib/staking';

const stakingTiers = [
  { duration: 30, apy: 8, label: '1 Month' },
  { duration: 90, apy: 12, label: '3 Months' },
  { duration: 180, apy: 16, label: '6 Months' },
  { duration: 365, apy: 20, label: '1 Year' },
];

const KITA_CONTRACT = '0x546638046Ca366375Ec2610ef48F5286b303306c';

export const StakingPortal: React.FC = () => {
  const [amount, setAmount] = useState('0');
  const [selectedTier, setSelectedTier] = useState(stakingTiers[0]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const tokenPrice = useTokenPrice();

  const { data: balance = 0n } = useContractRead({
    address: KITA_CONTRACT,
    abi: [
      {
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'balanceOf',
    args: [address ?? '0x'],
    enabled: !!address,
    watch: true,
  });

  const { writeAsync: stakeTokens, isPending } = useContractWrite({
    address: KITA_CONTRACT,
    abi: [
      {
        inputs: [
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint256', name: 'duration', type: 'uint256' },
        ],
        name: 'stake',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'stake',
  });

  const handleSetMax = () => {
    setAmount(balance.toString());
  };

  const handleStake = async () => {
    if (!amount || !isConnected) return;

    try {
      const stakeAmount = parseUnits(amount, 9);
      const tx = await stakeTokens({
        args: [stakeAmount, BigInt(selectedTier.duration)],
      });

      setToast({ type: 'success', message: 'Tokens staked successfully!' });
      setAmount('0');
      setIsConfirmOpen(false);
    } catch (error) {
      console.error('Error staking tokens:', error);
      setToast({
        type: 'error',
        message: 'Failed to stake tokens. Please try again.',
      });
    }
  };

  const monthlyRewards = calculateRewards(Number(amount), selectedTier.apy, 30);
  const yearlyRewards = calculateAPY(Number(amount), selectedTier.apy);
  const balanceUSD = calculateUSDValue(balance, tokenPrice);
  const stakeAmountUSD =
    amount !== '0'
      ? calculateUSDValue(parseUnits(amount || '0', 9), tokenPrice)
      : '$0.00';

  return (
    <div className="bg-[#1a2332] rounded-xl p-6 h-full flex flex-col">
      <StakingForm
        amount={amount}
        setAmount={setAmount}
        selectedTier={selectedTier}
        setSelectedTier={setSelectedTier}
        balance={balance}
        isConnected={isConnected}
        balanceUSD={balanceUSD}
        stakeAmountUSD={stakeAmountUSD}
        handleSetMax={handleSetMax}
        stakingTiers={stakingTiers}
        setShowTooltip={setShowTooltip}
        showTooltip={showTooltip}
        setIsCalculatorOpen={setIsCalculatorOpen}
        monthlyRewards={monthlyRewards}
        yearlyRewards={yearlyRewards}
      />

      <StakingTiers
        stakingTiers={stakingTiers}
        selectedTier={selectedTier}
        setSelectedTier={setSelectedTier}
        amount={amount}
        setShowTooltip={setShowTooltip}
        showTooltip={showTooltip}
      />

      <div className="mt-6">
        {isConnected ? (
          <button
            onClick={() => setIsConfirmOpen(true)}
            disabled={isPending || amount === '0'}
            className="w-full py-3 bg-[#8364ac] hover:bg-[#6b4f91] active:bg-[#5a4279] disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Staking...</span>
              </>
            ) : (
              'Stake Tokens'
            )}
          </button>
        ) : (
          <button
            onClick={() => open()}
            className="w-full py-3 bg-[#8364ac] hover:bg-[#6b4f91] active:bg-[#5a4279] rounded-lg font-semibold transition-colors"
          >
            Connect Wallet
          </button>
        )}
      </div>

      {isCalculatorOpen && (
        <RewardsCalculator
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
          stakingTiers={stakingTiers}
          tokenPrice={tokenPrice}
        />
      )}

      <ConfirmStakeModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleStake}
        amount={amount}
        usdValue={stakeAmountUSD}
        duration={selectedTier.duration}
        label={selectedTier.label}
        apy={selectedTier.apy}
        estimatedRewards={yearlyRewards}
        isPending={isPending}
      />

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