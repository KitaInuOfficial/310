import React, { useRef, useEffect, useState } from 'react';
import { BurnPortal } from './components/BurnPortal';
import { BurnDashboard } from './components/BurnDashboard';
import { BurnStats } from './components/BurnStats';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { Wallet } from 'lucide-react';

function App() {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const burnPortalRef = useRef<HTMLDivElement>(null);
  const [videoHeight, setVideoHeight] = useState('auto');

  useEffect(() => {
    const updateVideoHeight = () => {
      if (burnPortalRef.current) {
        const height = burnPortalRef.current.offsetHeight;
        setVideoHeight(`${height}px`);
      }
    };

    updateVideoHeight();
    window.addEventListener('resize', updateVideoHeight);
    const timeoutId = setTimeout(updateVideoHeight, 100);

    return () => {
      window.removeEventListener('resize', updateVideoHeight);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col">
      <div className="bg-transparent z-50">
        <div className="container mx-auto px-2.5 sm:px-4 lg:px-6">
          <div className="flex justify-end h-16">
            <button
              onClick={() => open()}
              className="px-4 py-2 text-sm bg-[#8364ac] hover:bg-[#6b4f91] active:bg-[#5a4279] rounded-lg font-semibold transition-colors my-auto flex items-center justify-center gap-2 h-[38px] min-w-[120px]"
            >
              <Wallet className="w-4 h-4" />
              {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect'}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2.5 sm:px-4 lg:px-6 pt-4 pb-4 sm:pt-6 sm:pb-6 lg:pt-8 lg:pb-8 mt-[-10px] sm:mt-[-10px] lg:mt-[-10px]">
        <div className="relative w-full bg-gradient-to-r from-[#8364ac] to-[#6b4f91] rounded-xl overflow-hidden shadow-[0_0_15px_rgba(149,117,189,0.15)]">
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-[12rem] lg:w-[20rem] h-[12rem] lg:h-[20rem] opacity-25">
            <div className="relative w-full h-full animate-float">
              <img 
                src="https://kitainu.org/logo.svg" 
                alt="KITA" 
                className="absolute inset-0 w-full h-full"
                style={{ 
                  transform: 'perspective(1000px) rotateY(-25deg) rotateX(10deg) scale(1.5)',
                  filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.2))',
                }}
              />
            </div>
          </div>

          <div className="relative py-8 lg:py-16 px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold pl-2.5 sm:pl-4 lg:pl-6">
                KITA Portal
              </h1>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1">
        <div className="container mx-auto px-2.5 sm:px-4 lg:px-6 pb-4 sm:pb-6 lg:pb-12 pt-2.5 sm:pt-0">
          <div className="grid gap-6 sm:gap-6">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-6">
              <div ref={burnPortalRef}>
                <BurnPortal />
              </div>
              <div 
                className="bg-[#1a2332] rounded-xl overflow-hidden hidden md:block"
                style={{ height: videoHeight }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="https://kitainu.org/wp-content/uploads/2024/11/portal.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-6">
              <BurnDashboard />
              <BurnStats />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;