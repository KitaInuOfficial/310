import React, { useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useContractWrite, useContractRead } from 'wagmi';
import { parseUnits } from 'viem';
import { Settings, Loader2, HelpCircle, Wallet } from 'lucide-react';
import { SlippageSettings } from './SlippageSettings';
import { ConfirmBurnModal } from './ConfirmBurnModal';
import { useTokenPrice } from '../hooks/useTokenPrice';
import { Toast } from './Toast';
import { formatTokenAmount, calculateUSDValue } from '../lib/price';

const BURN_ADDRESS = '0x000000000000000000000000000000000000dEaD';
const KITA_CONTRACT = '0x546638046Ca366375Ec2610ef48F5286b303306c';

const predefinedAmounts = [
  { label: '1B', value: '1,000,000,000' },
  { label: '5B', value: '5,000,000,000' },
  { label: '10B', value: '10,000,000,000' },
  { label: '50B', value: '50,000,000,000' },
  { label: '100B', value: '100,000,000,000' },
  { label: '250B', value: '250,000,000,000' },
  { label: '500B', value: '500,000,000,000' },
  { label: '1T', value: '1,000,000,000,000' },
];

const abi = [
  {
    "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }],
    "name": "transfer",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

export const BurnPortal = () => {
  const [amount, setAmount] = useState('0');
  const [slippage, setSlippage] = useState('Auto');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const tokenPrice = useTokenPrice();

  const { data: balance = 0n } = useContractRead({
    address: KITA_CONTRACT,
    abi,
    functionName: 'balanceOf',
    args: [address ?? '0x'],
    enabled: !!address,
    watch: true,
  });

  const { writeAsync: burnTokens, isPending } = useContractWrite({
    address: KITA_CONTRACT,
    abi,
    functionName: 'transfer',
  });

  const formattedBalance = isConnected ? formatTokenAmount(balance) : '0';
  const balanceUSD = isConnected ? calculateUSDValue(balance, tokenPrice) : '$0.00';
  const burnAmountUSD = amount !== '0' 
    ? calculateUSDValue(parseUnits(amount.replace(/,/g, ''), 9), tokenPrice)
    : '$0.00';

  const formatDisplayAmount = (value: string) => {
    return Number(value.replace(/,/g, '')).toLocaleString();
  };

  const handleSetMax = () => {
    setAmount(formattedBalance);
  };

  const handleBurn = async () => {
    if (!amount || !isConnected) return;
    
    try {
      const burnAmount = parseUnits(amount.replace(/,/g, ''), 9);
      if (burnAmount > balance) {
        setToast({ type: 'error', message: 'Amount exceeds balance' });
        return;
      }
      
      const tx = await burnTokens({ 
        args: [BURN_ADDRESS, burnAmount]
      });
      setToast({ type: 'success', message: 'Tokens burned successfully!' });
      setAmount('0');
      setIsConfirmOpen(false);
    } catch (error) {
      console.error('Error burning tokens:', error);
      setToast({ type: 'error', message: 'Failed to burn tokens. Please try again.' });
    }
  };

  return (
    <div className="bg-[#1a2332] rounded-xl p-4 lg:p-6 border border-[#2d3748]">
      <div className="flex items-center justify-between mb-4 lg:mb-6 px-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg lg:text-xl font-semibold">Burn Portal</h2>
          <div className="relative">
            <HelpCircle 
              className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 cursor-help"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-[#2d3748] text-xs lg:text-sm p-3 rounded-lg shadow-lg w-48 lg:w-64 z-10">
                Burning tokens permanently removes them from circulation by sending them to a burn address.
              </div>
            )}
          </div>
        </div>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 rounded-lg bg-[#2d3748] hover:bg-[#3a4a63] transition-colors"
        >
          <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>
      </div>

      <div className="bg-gradient-to-br from-[#1a2332] to-[#0d1117] p-4 lg:p-6 rounded-xl border border-[#2d3748] mb-4 lg:mb-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <span className="text-[#8364ac] font-semibold flex items-center gap-2 text-base lg:text-lg mb-2 sm:mb-0">
            <img src="https://kitainu.org/logo.svg" alt="KITA" className="w-5 h-5 lg:w-6 lg:h-6" />
            Burn KITA
          </span>
          <div className="flex flex-col sm:items-end">
            <div className="flex items-center gap-2 justify-between sm:justify-end">
              <span className="text-gray-400 font-semibold text-sm lg:text-base">Balance:</span>
              <span className="text-gray-400 font-semibold text-sm lg:text-base">{formattedBalance} KITA</span>
              {isConnected && (
                <button
                  onClick={handleSetMax}
                  className="px-2 py-1 text-xs lg:text-sm bg-[#2d3748] hover:bg-[#3a4a63] rounded transition-colors ml-2"
                >
                  Max
                </button>
              )}
            </div>
            <div className="text-xs lg:text-sm text-gray-500">{balanceUSD}</div>
          </div>
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={formatDisplayAmount(amount)}
            onChange={(e) => setAmount(e.target.value.replace(/,/g, ''))}
            className="w-full bg-transparent text-lg lg:text-xl font-semibold outline-none"
            placeholder="0.0"
          />
          <div className="text-xs lg:text-sm text-gray-500">{burnAmountUSD}</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4 lg:mb-6">
        {predefinedAmounts.map((preset) => (
          <button
            key={preset.value}
            onClick={() => setAmount(preset.value.replace(/,/g, ''))}
            className={`px-2 lg:px-4 py-2 rounded-lg hover:bg-[#3a4a63] transition-colors font-medium text-xs lg:text-sm ${
              amount === preset.value.replace(/,/g, '') 
                ? 'bg-gradient-to-r from-[#8364ac] to-[#6b4f91] text-white' 
                : 'bg-[#2d3748]'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {isConnected ? (
        <button
          onClick={() => setIsConfirmOpen(true)}
          disabled={isPending || amount === '0'}
          className="w-full px-4 py-2 text-sm bg-[#8364ac] hover:bg-[#6b4f91] active:bg-[#5a4279] rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 h-[38px] lg:h-[46px] disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Burning...</span>
            </>
          ) : (
            'Burn Tokens'
          )}
        </button>
      ) : (
        <button
          onClick={() => open()}
          className="w-full px-4 py-2 text-sm bg-[#8364ac] hover:bg-[#6b4f91] active:bg-[#5a4279] rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 h-[38px] lg:h-[46px]"
        >
          <Wallet className="w-4 h-4" />
          <span>Connect</span>
        </button>
      )}

      <SlippageSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSlippageChange={setSlippage}
        currentSlippage={slippage}
      />

      <ConfirmBurnModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleBurn}
        amount={formatDisplayAmount(amount)}
        usdValue={burnAmountUSD}
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