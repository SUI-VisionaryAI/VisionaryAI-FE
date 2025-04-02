import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/App.css';

import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ConnectButton,
  SuiClientProvider,
  WalletProvider,
  createNetworkConfig,
} from '@mysten/dapp-kit';
import { Toaster } from 'react-hot-toast';
import { getFullnodeUrl } from '@mysten/sui/client';
import { AppProvider } from 'contexts/AppContext';

const { networkConfig } = createNetworkConfig({
  testnet: {
    url: getFullnodeUrl('testnet'),
  },
  mainnet: {
    url: getFullnodeUrl('mainnet'),
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig}>
        <AppProvider>
          <WalletProvider
            defaultNetwork="testnet"
            autoConnect={false}
          >
            <App />
            <Toaster position="top-center" />
            {/* <ConnectButton />; */}
          </WalletProvider>
        </AppProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
