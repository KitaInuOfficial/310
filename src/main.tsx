import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/ErrorBoundary';

import App from './App.tsx';
import './index.css';

const projectId = '2d70924da43b515099764873e0e6ac5d';
const metadata = {
  name: 'KITA INU Burn Portal',
  description: 'Burn your KITA tokens',
  url: 'https://kitainu.net',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet];
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

createWeb3Modal({ 
  wagmiConfig: config, 
  projectId, 
  chains,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-z-index': '2147483647', // Maximum z-index value
    '--w3m-modal-margin': '24px auto',
  }
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  </StrictMode>
);