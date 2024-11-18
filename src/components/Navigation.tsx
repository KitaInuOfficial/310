import React from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { useScrollDirection } from '../hooks/useScrollDirection';

export const Navigation = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const isVisible = useScrollDirection();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 bg-[#0d1117]/95 transition-transform duration-300 z-50 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-[50px]">
        <div className="flex justify-between items-center h-[80px] lg:h-[96px]">
          <div className="flex items-center gap-2 lg:gap-3">
            <a
              href="https://kitainu.org"
              className="flex items-center transition-transform hover:scale-105"
            >
              <img
                src="https://kitainu.org/logo.svg"
                alt="KITA INU"
                className="w-8 h-8 lg:w-9 lg:h-9"
              />
            </a>
            <span className="text-xl lg:text-2xl font-bold">Stake</span>
          </div>

          <button
            onClick={() => open()}
            className="px-3 lg:px-6 py-2 lg:py-3 h-[38px] lg:h-[46px] bg-[#8364ac] hover:bg-[#6b4f91] active:bg-[#5a4279] rounded-lg font-semibold transition-colors text-[14px] lg:text-[16px] flex items-center justify-center min-w-[120px] lg:min-w-[160px]"
          >
            {isConnected
              ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
              : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </nav>
  );
};
